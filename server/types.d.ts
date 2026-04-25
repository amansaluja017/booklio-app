import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      customer: CustomerTypes;
      provider: ProviderTypes;
      admin: AdminTypes;
    }
  }
}

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
}

export interface BookingTypes {
  _id?: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  provider: mongoose.Types.ObjectId;
  notes?: string;
  category: string;
  status: "requested" | "confirmed" | "in-progress" | "completed" | "cancelled";
  date: Date;
  location: {
    state: string;
    city: string;
    country: string;
  };
  image?: string;
  otp?: string;
  before_image?: string;
  after_image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryTypes {
  _id?: string;
  name: string;
  services_name: string[];
  providers?: mongoose.Types.ObjectId[];
  services?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

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
}

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

export interface ReviewTypes {
  service: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface ServiceTypes {
  _id: string;
  name: string;
  category: mongoose.Types.ObjectId;
  provider: mongoose.Types.ObjectId;
  description: string;
  price: number;
  status: boolean;
  rating: number;
  reviews?: mongoose.Types.ObjectId[];
  location: {
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export {};
