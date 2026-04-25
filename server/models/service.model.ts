import mongoose, { Schema } from "mongoose";

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

const serviceSchema = new Schema<ServiceTypes>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    provider: {
      type: mongoose.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [mongoose.Types.ObjectId],
      ref: "Review",
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

serviceSchema.index({
  name: "text",
  description: "text",
  "location.city": "text",
  "location.state": "text",
  "location.country": "text",
});

export const Service =
  mongoose.models?.Service || mongoose.model("Service", serviceSchema);
