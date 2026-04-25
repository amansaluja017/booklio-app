import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ProviderTypes } from "server/types";
import { auth_secret } from "server/config/config";

const providerSchema = new Schema<ProviderTypes>({
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
  },
  store: {
    type: String,
  },
  address: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  documents: {
    type: Object,
  },
  services: {
    type: [mongoose.Types.ObjectId],
    ref: "Service",
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "provider", "admin"],
  },
  bankDetails: {
    type: Object,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: [String],
  },
  isAprooved: {
    type: Boolean,
    required: true,
    default: false
  },
  refreshToken: {
    type: String
  }
}, { timestamps: true });

providerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

providerSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

providerSchema.methods.generateAccessToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "1d" });
};

providerSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign({ id: this._id }, auth_secret, { expiresIn: "7d" });
};

export const Provider =
  mongoose.model<ProviderTypes>("Provider", providerSchema);
