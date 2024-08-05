import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import { StatusCodes } from "http-status-codes";
import Booking from "../models/BookingSchema.js";
import Ship from "../models/ShipModel.js";

// Backend: getUserBookings.js
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid user ID" });
    }

    // Find user and populate bookings with ship details
    const user = await User.findById(userId).populate({
      path: "bookings",
      populate: {
        path: "shipId",
        model: "Ship",
        select: "name image capacity pricePerHour location shipFeatures isApproved booked", // Select required fields
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    if (user.bookings.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No bookings found for this user" });
    }

    // Format the response to include all ship details
    const bookingsWithShipDetails = user.bookings.map((booking) => ({
      bookedAt: booking.bookedAt,
      shipName: booking.shipId.name,
      shipImage: booking.shipId.image,
      capacity: booking.shipId.capacity,
      location: booking.shipId.location,
      shipFeatures: booking.shipId.shipFeatures,
      isApproved: booking.shipId.isApproved,
      pricePerHour:booking.shipId.pricePerHour,
      booked: booking.shipId.booked,
    }));

    res.status(StatusCodes.OK).json({
      msg: "User bookings retrieved",
      bookings: bookingsWithShipDetails,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};
