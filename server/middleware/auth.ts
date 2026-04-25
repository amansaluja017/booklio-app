import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Admin } from "../models/admin.model";
import { Customer } from "../models/customer.model";
import { Provider } from "../models/provider.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export interface AdminTypes {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "customer" | "provider" | "admin";
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
};

export interface CustomerTypes {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  address?: {
    state: string;
    city: string;
    zipCode: string;
    country: string;
  };
  password: string;
  past_bookings?: mongoose.Types.ObjectId[];
  role: "customer" | "provider" | "admin";
  refreshToken?: string;

  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
};

export interface ProviderTypes {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: {
    state: string;
    city: string;
    street: string;
    zipCode: string;
    country: string;
  };
  store: string;
  documents?: object;
  services: Array<mongoose.Types.ObjectId>;
  password: string;
  description: string;
  role: "customer" | "provider" | "admin";
  bankDetails?: object;
  rating?: number;
  reviews?: Array<string>;
  isAprooved: boolean;
  refreshToken: string;
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

declare global {
  namespace Express {
    interface Request {
      customer: CustomerTypes;
      provider: ProviderTypes;
      admin: AdminTypes;
    }
  }
};

type cookiesType<T> = T extends string ? T : never;

export const verifyJWT = asyncHandler(
  async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    
    try {
      const token: cookiesType<string> =
        req.cookies.accessToken ??
        (req.headers?.["authorization"]
          ? req.headers["authorization"].replace("Bearer ", "")
          : undefined);

      if (!token) {
        throw new ApiError(401, "unauthorized");
      }

      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        process.env.AUTH_SECRET!,
      );

      if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
        throw new ApiError(401, "unauthorized");
      }

      const customer: CustomerTypes | null = await Customer.findById(
        new mongoose.Types.ObjectId(decoded.id),
      );

      if (!customer) {
        throw new ApiError(401, "unauthorized");
      }

      req.customer = customer;
      next();
    } catch (error) {
      console.error("Failed to verify JWT", error);
      throw new ApiError(401, "unauthorized");
    }
  },
);

export const verifyJWTProvider = asyncHandler(
  async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
      const token: cookiesType<string> =
        req.cookies?.accessToken ??
        (req.headers?.["authorization"]
          ? req.headers["authorization"].replace("Bearer ", "")
          : undefined);
      if (!token) {
        throw new ApiError(401, "unauthorized");
      }

      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        process.env.AUTH_SECRET!,
      );

      if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
        throw new ApiError(401, "unauthorized");
      }

      const provider: ProviderTypes | null = await Provider.findById(
        new mongoose.Types.ObjectId(decoded.id),
      );

      if (!provider) {
        throw new ApiError(401, "unauthorized");
      }

      req.provider = provider;
      next();
    } catch (error) {
      console.error("Failed to verify JWT", error);
      throw new ApiError(401, "unauthorized");
    }
  },
);

export const verifyJWTAdmin = asyncHandler(
  async (req: Request, _: Response, next: NextFunction): Promise<any> => {
    try {
      const token: cookiesType<string> =
        req.cookies?.accessToken ??
        (req.headers?.["authorization"]
          ? req.headers["authorization"].replace("Bearer ", "")
          : undefined);
      if (!token) {
        throw new ApiError(401, "unauthorized");
      }

      const decoded: string | jwt.JwtPayload = jwt.verify(
        token,
        process.env.AUTH_SECRET!,
      );

      if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
        throw new ApiError(401, "unauthorized");
      }

      const admin: AdminTypes | null = await Admin.findById(
        new mongoose.Types.ObjectId(decoded.id),
      );

      if (!admin) {
        throw new ApiError(401, "unauthorized");
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error("Failed to verify JWT", error);
      throw new ApiError(401, "unauthorized");
    }
  },
);
