import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const customerSchema = new Schema<CustomerTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    past_bookings: {
      type: [mongoose.Types.ObjectId],
    },
    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);


customerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

customerSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

customerSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "1d" });
};

customerSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "7d" });
};

export const Customer =
  mongoose.model<CustomerTypes>("Customer", customerSchema);