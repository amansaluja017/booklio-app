import mongoose from "mongoose";
import { Provider } from "../models/provider.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { providerRegister, storeSetup } from "../validations/validation";
import { z } from "zod";
import { type Request, type Response } from "express";
import bcrypt from "bcrypt";


export const generateAccessAndRefreshToken = async (userId: mongoose.Types.ObjectId) => {
    try {
        const provider = await Provider.findById(userId);

        if (!provider) {
            throw new ApiError(404, "Provider not found");
        }

        const accessToken = await provider?.generateAccessToken();
        const refreshToken = await provider?.generateRefreshToken();

        provider.refreshToken = refreshToken;
        await provider?.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error: any) {
        throw new ApiError(
            500,
            "failed to generate access and refresh token",
            error.message
        );
    }
};

export const registerProvider = asyncHandler(async (req: Request, res: Response) => {

    const body = req.body;

    const parseData = providerRegister.safeParse(body);

    if (!parseData.success) {
        throw new ApiError(400, "Invalid input data", (z as any).treeifyError(parseData.error).properties);
    }

    const { name, email, password } = parseData.data;

    try {
        const existedProvider = await Provider.findOne({ email });

        if (existedProvider) {
            return res.status(400).json(
                new ApiResponse(400, null, "Provider with this email already exists")
            );
        }

        const newProvider = await Provider.create({
            name,
            email,
            password,
            role: "provider",
        });

        if (!newProvider) {
            return res.status(500).json(
                new ApiResponse(500, null, "Failed to create provider")
            );
        }

        return res.status(201).json(
            new ApiResponse(201, { newProvider }, "Provider registered successfully")
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while registering the provider")
        );
    }
});

export const loginProvider = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await Provider.findOne({ email }).select("+password +refreshToken");

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
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
                "Logged in successfully"
            )
        );
});

export const getProviderProfile = asyncHandler(async (req: Request, res: Response) => {
    const provider = req.provider;

    if (!provider) {
        throw new ApiError(404, "Provider not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, provider, "Provider profile fetched successfully"));
});

export const logoutProvider = asyncHandler(async (req: Request, res: Response) => {
    const provider = req.provider;

    if (!provider) {
        throw new ApiError(404, "Provider not found");
    }

    const logoutProvider = await Provider.findByIdAndUpdate(
        req?.provider?._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        {
            new: true,
        }
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
        .json(new ApiResponse(200, logoutProvider, "logged out successfully"));
});

export const updateProviderProfile = asyncHandler(async (req: Request, res: Response) => {
    const provider = req.provider;

    if (!provider) {
        throw new ApiError(404, "Provider not found");
    }

    const parseData = storeSetup.safeParse(req.body);

    if (!parseData.success) {
        return res.status(400).json({ error: (z as any).treeifyError(parseData.error).properties });
    }

    const { phone, store, city, state, country, zipCode, description } = parseData.data;

    try {
        const updateProvider = await Provider.findOneAndUpdate(
            { _id: provider._id },
            { phone, store, address: { city, state, country, zipCode }, description },
            { upsert: true, returnDocument: "after" }
        );

        if (!updateProvider) {
            return res.status(404).json({ error: "Provider not found" });
        }

        return res.status(200).json({ message: "Store set up successfully", updateProvider });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export const updateProviderPassword = asyncHandler(async (req: Request, res: Response) => {

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!(oldPassword && newPassword && confirmPassword)) {
    throw new ApiError(400, "All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "new password and confirm password does not match");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(400, "new password must be different from old password");
  }

  try {

    const provider = await Provider.findById(req.provider?._id);
    if (!provider) throw new ApiError(404, "user not found");
    const passwordCompare = await bcrypt.compare(oldPassword, provider.password);
    if (!passwordCompare) {
      throw new ApiError(400, "old password is incorrect");
    }
    
    provider.password = confirmPassword;
    await provider.save();

    return res.status(200).json({ message: "password updated successfully" });

  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error: failed to update password");
  }
});

export const getAllProviders = asyncHandler(async (req: Request, res: Response) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const providers = await Provider.find();
    return res.status(200).json(new ApiResponse(200, { providers }, "Providers retrieved successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});

export const approveProvider = asyncHandler(async (req: Request, res: Response) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }

  const { providerId } = req.params;

  if (!providerId || !mongoose.Types.ObjectId.isValid(providerId)) {
    throw new ApiError(400, "Invalid provider ID");
  }

  try {
    const provider = await Provider.findByIdAndUpdate(
      providerId,
      { isAprooved: true },
      { new: true }
    );

    if (!provider) {
      throw new ApiError(404, "Provider not found");
    }

    return res.status(200).json(new ApiResponse(200, provider, "Provider approved successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});

export const rejectProvider = asyncHandler(async (req: Request, res: Response) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized");
  }

  const { providerId } = req.params;

  if (!providerId || !mongoose.Types.ObjectId.isValid(providerId)) {
    throw new ApiError(400, "Invalid provider ID");
  }

  try {
    const provider = await Provider.findByIdAndDelete(providerId);

    if (!provider) {
      throw new ApiError(404, "Provider not found");
    }

    return res.status(200).json(new ApiResponse(200, provider, "Provider rejected successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});