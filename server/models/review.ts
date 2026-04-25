import mongoose, { Schema } from "mongoose";
import { ReviewTypes } from "server/types";

const reviewSchema = new Schema<ReviewTypes>(
  {
    service: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Review =
  mongoose.models?.Review ||
  mongoose.model<ReviewTypes>("Review", reviewSchema);
