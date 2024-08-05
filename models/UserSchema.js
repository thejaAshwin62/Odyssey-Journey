import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    location: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", User);
