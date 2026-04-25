import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Admin } from "../models/admin.model";
import { Customer } from "../models/customer.model";
import { Provider } from "../models/provider.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { AdminTypes, CustomerTypes, ProviderTypes } from "server/types";

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
