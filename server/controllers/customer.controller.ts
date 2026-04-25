import mongoose from "mongoose";
import { type Request, type Response } from "express";
import { Customer } from "../models/customer.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  customerRegister,
  loginCustomerValidation,
  updateAddress,
} from "../validations/validation";
import { ApiResponse } from "../utils/ApiResponse";
import bcrypt from "bcrypt";
import { z } from "zod";

export const generateAccessAndRefreshToken = async (
  userId: mongoose.Types.ObjectId,
) => {
  try {
    const customer = await Customer.findById(userId);

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const accessToken = customer.generateAccessToken();
    const refreshToken = customer.generateRefreshToken();

    customer.refreshToken = refreshToken;
    await customer?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new ApiError(
      500,
      "failed to generate access and refresh token",
      error.message,
    );
  }
};

export const registerCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    const parseData = customerRegister.safeParse(body);

    if (!parseData.success) {
      throw new ApiError(
        400,
        "Invalid input data",
        (z as any).treeifyError(parseData.error).properties,
      );
    }

    const { name, email, password } = parseData.data;

    try {
      const existedCustomer = await Customer.findOne({ email });

      if (existedCustomer) {
        throw new ApiError(400, "Customer with this email already exists");
      }

      const newCustomer = await Customer.create({
        name,
        email,
        password,
        role: "customer",
      });

      if (!newCustomer) {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Failed to create customer"));
      }

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { newCustomer },
            "Customer registered successfully",
          ),
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            null,
            "An error occurred while registering the customer",
          ),
        );
    }
  },
);

export const loginCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    const parsedData = loginCustomerValidation.safeParse(body);

    if (!parsedData.success) {
      throw new ApiError(
        400,
        "Invalid input data",
        (z as any).treeifyError(parsedData.error).properties,
      );
    }

    const { email, password } = parsedData.data;

    const user = await Customer.findOne({ email }).select(
      "+password +refreshToken",
    );

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(
        new ApiResponse(
          200,
          {
            user,
            accessToken,
            refreshToken,
          },
          "Logged in successfully",
        ),
      );
  },
);

export const getCustomerProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = req.customer;

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, customer, "User profile fetched successfully"),
      );
  },
);

export const logoutCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = req.customer;

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const logoutCustomer = await Customer.findByIdAndUpdate(
      req?.customer?._id,
      {
        $set: {
          refreshToken: null,
        },
      },
      {
        new: true,
      },
    );

    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(new ApiResponse(200, logoutCustomer, "logged out successfully"));
  },
);

export const updateCustomerPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      throw new ApiError(
        400,
        "new password and confirm password does not match",
      );
    }

    if (oldPassword === newPassword) {
      throw new ApiError(
        400,
        "new password must be different from old password",
      );
    }

    try {
      const customer = await Customer.findById(req.customer?._id);
      if (!customer) throw new ApiError(404, "user not found");
      const passwordCompare = await bcrypt.compare(
        oldPassword,
        customer.password,
      );
      if (!passwordCompare) {
        throw new ApiError(400, "old password is incorrect");
      }

      customer.password = confirmPassword;
      await customer.save();

      return res
        .status(200)
        .json(new ApiResponse(200, null, "password updated successfully"));
    } catch (error) {
      console.error(error);
      throw new ApiError(
        500,
        "Internal server error: failed to update password",
      );
    }
  },
);

export const updateCustomerAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = req.customer;

    if (!customer) {
      throw new ApiError(404, "Customer not found");
    }

    const body = req.body;
    const parseData = updateAddress.safeParse(body);

    if (!parseData.success) {
      throw new ApiError(
        400,
        "Invalid input data",
        (z as any).treeifyError(parseData.error).properties,
      );
    }

    const { country, state, city, zipCode, phone } = parseData.data;
    const address = { country, state, city, zipCode };

    try {
      const updateAddressRes = await Customer.findOneAndUpdate(
        { _id: customer._id },
        { address, phone },
        { returnDocument: "after" },
      );
      if (!updateAddressRes) {
        throw new ApiError(500, "failed to update the address");
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { address: updateAddressRes.address },
            "address updated successfully",
          ),
        );
    } catch (error) {
      console.error(error);
      throw new ApiError(
        500,
        "Internal server error: failed to update address",
      );
    }
  },
);
