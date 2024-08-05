import User from "../models/UserSchema.js";
import mongoose from "mongoose";
import Ship from "../models/ShipModel.js";
import Booking from "../models/BookingSchema.js";
import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Unauthorized" });
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Fetch ships data
    const shipsData = await Ship.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fetch user logins data
    const userLoginsData = await User.aggregate([
      {
        $lookup: {
          from: "logins",
          localField: "_id",
          foreignField: "userId",
          as: "loginsDetails",
        },
      },
      { $unwind: "$loginsDetails" },
      { $unwind: "$loginsDetails.createdAt" },
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$loginsDetails.createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fetch bookings data
    const bookingsData = await Booking.aggregate([
      {
        $match: {
          bookedAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookedAt" } },
          totalBookings: { $sum: 1 },
          approvedBookings: {
            $sum: {
              $cond: [{ $eq: ["$isApproved", "approved"] }, 1, 0],
            },
          },
          pendingBookings: {
            $sum: {
              $cond: [{ $eq: ["$isApproved", "pending"] }, 1, 0],
            },
          },
          canceledBookings: {
            $sum: {
              $cond: [{ $eq: ["$isApproved", "canceled"] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const users = await User.countDocuments();
    const ships = await Ship.countDocuments();

    const bookings = await Booking.find()
      .populate("userId", "name")
      .populate("shipId", "name pricePerHour shipFeatures isApproved")
      .exec();

    const bookedShips = bookings.map((booking) => ({
      shipName: booking.shipId ? booking.shipId.name : "Unknown Ship",
      userName: booking.userId ? booking.userId.name : "Unknown User",
      pricePerHour: booking.shipId
        ? booking.shipId.pricePerHour
        : "Unknown Price",
      shipFeatures: booking.shipId
        ? booking.shipId.shipFeatures
        : "Unknown Features",
      isApproved: booking.shipId ? booking.shipId.isApproved : "Unknown Status",
      bookingDate: formatDate(booking.bookingDate),
      bookingId: booking._id,
    }));

    // Function to format ships data
    const formatShipsData = (data) => {
      return data.map((item) => ({
        date: item._id,
        count: item.count,
      }));
    };

    // Function to format user logins data
    const formatUserLoginsData = (data) => {
      return data.map((item) => ({
        date: item._id,
        count: item.count,
      }));
    };

    // Function to format bookings data
    const formatBookingsData = (data) => {
      return data.map((item) => ({
        date: item._id,
        totalBookings: item.totalBookings,
        approvedBookings: item.approvedBookings,
        pendingBookings: item.pendingBookings,
        canceledBookings: item.canceledBookings,
      }));
    };

    res.status(StatusCodes.OK).json({
      users,
      ships,
      bookedShips,
      shipsData: formatShipsData(shipsData),
      userLoginsData: formatUserLoginsData(userLoginsData),
      bookingsData: formatBookingsData(bookingsData),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

const formatDate = (date) => {
  if (!date) {
    return "Date not available"; // Handle null or undefined dates
  }
  return new Date(date).toISOString();
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
export const updateShipApproval = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Ship ID:", id); // Log the ID to check
    const { status } = req.body;

    if (!["approved", "cancelled", "pending"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const ship = await Ship.findById(id);

    if (!ship) {
      return res.status(404).json({ msg: "Ship not found" });
    }

    ship.isApproved = status;
    await ship.save();

    res.status(200).json({ msg: `Ship ${status}`, ship });
  } catch (error) {
    console.error("Error:", error); // Log the error to debug
    res.status(500).json({ msg: "Server Error" });
  }
};

export const bookShipForUser = async (req, res) => {
  try {
    const { shipId, userId } = req.params;
    const { bookingDate } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(shipId)
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid ID" });
    }

    const ship = await Ship.findById(shipId);
    if (!ship)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Ship not found" });
    if (ship.booked)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Ship is already booked" });

    // Create a booking entry with status pending
    const booking = new Booking({ userId, shipId, bookingDate });
    await booking.save();

    // Update ship status to pending and save
    ship.isApproved = "pending";
    await ship.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: booking._id } },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      msg: "Booking request submitted successfully",
      ship: { ...ship.toObject(), bookingDate },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server Error" });
  }
};
