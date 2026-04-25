import mongoose, { Schema } from "mongoose";

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

const bookingSchema = new Schema<BookingTypes>({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'requested'
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  otp: {
    type: String,
    default: ""
  },
  before_image: {
    type: String,
    default: ""
  },
  after_image: {
    type: String,
    default: ""
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
  }
}, { timestamps: true });

export const Booking = mongoose.models?.Booking || mongoose.model<BookingTypes>('Booking', bookingSchema);