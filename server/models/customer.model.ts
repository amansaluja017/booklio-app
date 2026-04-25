import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerTypes } from "server/types";
import { auth_secret } from "server/config/config";

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

customerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

customerSchema.methods.generateAccessToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "1d" });
};

customerSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "7d" });
};

export const Customer =
  mongoose.model<CustomerTypes>("Customer", customerSchema);