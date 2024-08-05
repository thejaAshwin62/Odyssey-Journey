// controllers/statsController.js
import Ship from "../models/ShipModel.js";
import User from "../models/UserSchema.js";

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Controller to get ship and user statistics
export const getStats = async (req, res) => {
  try {
    // Get the start and end dates for the data (e.g., last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    // Aggregate the number of ships created per day
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

    // Aggregate the number of user logins per day
    const userLoginsData = await User.aggregate([
      {
        $lookup: {
          from: "bookings", // Assuming bookings is the collection name
          localField: "bookings",
          foreignField: "_id",
          as: "bookingsDetails",
        },
      },
      { $unwind: "$bookingsDetails" },
      { $unwind: "$bookingsDetails.createdAt" },
      {
        $match: {
          "bookingsDetails.createdAt": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$bookingsDetails.createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format data to match the chart format
    const formatData = (data) => {
      return data.map((item) => ({
        date: item._id,
        count: item.count,
      }));
    };

    res.json({
      shipsData: formatData(shipsData),
      userLoginsData: formatData(userLoginsData),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
