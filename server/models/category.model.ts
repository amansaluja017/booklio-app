import mongoose, { Schema } from "mongoose";
import { CategoryTypes } from "server/types";

const categorySchema = new Schema<CategoryTypes>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    services_name: {
      type: [String],
      required: true,
    },
    providers: {
      type: [mongoose.Types.ObjectId],
      ref: "Provider",
    },
    services: {
      type: [mongoose.Types.ObjectId],
      ref: "Service",
    }
  },
  { timestamps: true },
);

export const Category =
  mongoose.models?.Category ||
  mongoose.model<CategoryTypes>("Category", categorySchema);
