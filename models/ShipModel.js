import mongoose from "mongoose";
import { SHIP_FEATURES } from "../utils/constants.js";

const Ship = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    shipFeatures: {
      type: String,
      enum: Object.values(SHIP_FEATURES),
      default: SHIP_FEATURES.VIP_LOUNGE,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "rejected", "avaiable"],
      default: "avaiable",
    },
    location: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ship",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ship", Ship);
