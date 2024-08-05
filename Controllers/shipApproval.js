import mongoose from "mongoose";
import Booking from "../models/BookingSchema.js";
import Ship from "../models/ShipModel.js";
import { StatusCodes } from "http-status-codes";

// Approve or reject a booking
export const approveBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    console.log(`Received Booking ID in backend: ${bookingId}`);
    console.log(`Received Status in backend: ${status}`);

    // Validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid status value" });
    }

    const booking = await Booking.findById(bookingId)
      .populate("shipId")
      .populate("userId");
    if (!booking) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Booking not found" });
    }

    booking.isApproved = status;
    await booking.save();

    // Optionally, update the ship status if the booking is approved or rejected
    const ship = booking.shipId;
    if (status === "approved") {
      ship.isApproved = "approved";
    } else if (status === "rejected") {
      ship.isApproved = "rejected";
    } else {
      ship.isApproved = "pending";
    }
    await ship.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Booking and Ship status updated", booking, ship });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Validate the booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid booking ID" });
    }

    // Find and delete the booking
    const booking = await Booking.findByIdAndDelete(bookingId);

    // Check if booking was found and deleted
    if (!booking) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Booking not found" });
    }

    // Send a success response
    res.status(StatusCodes.OK).json({ msg: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};