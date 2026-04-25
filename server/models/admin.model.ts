import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth_secret } from "server/config/config";
import { AdminTypes } from "server/types";

const adminSchema = new Schema<AdminTypes>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "provider", "admin"],
    default: "customer"
  },
  refreshToken: {
    type: String,
  }
}, { timestamps: true });

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

adminSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "1d" });
};

adminSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "7d" });
};

export const Admin = mongoose.model<AdminTypes>('Admin', adminSchema);