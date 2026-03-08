import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  store: string,
  documents?: object;
  services: Array<mongoose.Types.ObjectId>;
  password: string;
  description: string;
  role: "customer" | "provider" | "admin";
  bankDetails?: object;
  rating?: number;
  reviews?: Array<string>;
  isAprooved: boolean,
  refreshToken: string,
  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

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

providerSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

providerSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "1d" });
};

providerSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.AUTH_SECRET!, { expiresIn: "7d" });
};

export const Provider =
  mongoose.model<ProviderTypes>("Provider", providerSchema);
