import { Admin } from "../models/admin.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
  adminRegister,
  loginAdminValidations,
} from "../../validations/validation";
import { Request, Response } from "express";
import z from "zod";
import mongoose from "mongoose";

export const generateAccessAndRefreshToken = async (
  userId: mongoose.Types.ObjectId,
) => {
  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new ApiError(
      500,
      "failed to generate access and refresh token",
      error.message,
    );
  }
};

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    const parseData = adminRegister.safeParse(body);

    if (!parseData.success) {
      throw new ApiError(
        400,
        "Invalid input data",
        (z as any).treeifyError(parseData.error).properties,
      );
    }

    const { name, email, password } = parseData.data;

    try {
      const existedCustomer = await Admin.findOne({ email });

      if (existedCustomer) {
        return res
          .status(400)
          .json(
            new ApiResponse(400, null, "Admin with this email already exists"),
          );
      }

      const newCustomer = await Admin.create({
        name,
        email,
        password,
        role: "admin",
      });

      if (!newCustomer) {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Failed to create admin"));
      }

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { newCustomer },
            "Admin registered successfully",
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
            "An error occurred while registering the admin",
          ),
        );
    }
  },
);

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;

  const parsedData = loginAdminValidations.safeParse(body);

  if (!parsedData.success) {
    throw new ApiError(
      400,
      "Invalid input data",
      (z as any).treeifyError(parsedData.error).properties,
    );
  }

  const { email, password } = parsedData.data;

  const user = await Admin.findOne({ email }).select("+password +refreshToken");

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
});

export const getAdminProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const admin = req.admin;

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, admin, "User profile fetched successfully"));
  },
);

export const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const logoutAdmin = await Admin.findByIdAndUpdate(
    req?.admin?._id,
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
    .json(new ApiResponse(200, logoutAdmin, "logged out successfully"));
});
