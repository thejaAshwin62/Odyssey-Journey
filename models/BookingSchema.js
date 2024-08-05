import mongoose from "mongoose";
import Ship from "./ShipModel.js"; // Ensure correct path

const Booking = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ship",
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    isApproved: {
      type: String, // or another type depending on your needs
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", Booking);
