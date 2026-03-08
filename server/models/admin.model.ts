import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

adminSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "1d" });
};

adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "7d" });
};

export const Admin = mongoose.model<AdminTypes>('Admin', adminSchema);