import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useAllJobsContext } from "../pages/AllShips";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Ship = ({
  _id,
  name,
  capacity,
  pricePerHour,
  shipFeatures,
  createdAt,
  location,
  image,
  booked,
  isApproved,
}) => {
  const { userInfo } = useAllJobsContext();
  const { userId, role } = userInfo;
  const [bookingDate, setBookingDate] = useState("");
  const [isPending, setIsPending] = useState(false); // State for booking
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner when submitting
    try {
      await customFetch.post(`/ships/${_id}/book/${userId}`, {
        bookingDate,
      });
      toast.success(
        "Booking request submitted successfully. Awaiting approval."
      );
    } catch (error) {
      toast.error("Failed to submit booking request");
    } finally {
      setLoading(false); // Hide loading spinner after submission
    }
  };

  const handleDelete = async () => {
    try {
      await customFetch.delete(`/ships/${_id}`);
      toast.success("Ship deleted successfully.");
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete ship.");
    }
  };

  const statusStyles = {
    pending: { background: "#fef3c7", color: "#f59e0b" },
    available: { background: "#e0e8f9", color: "#647acb" },
    booked: { background: "#ffeeee", color: "#d66a6a" },
  };

  const currentStatusStyle =
    isApproved === "pending"
      ? statusStyles.pending
      : isApproved === "approved"
      ? statusStyles.booked
      : statusStyles.available;

  return (
    <Card
      sx={{
        maxWidth: 395,
        borderRadius: 5,
        marginBottom: 8,
        boxShadow: 8,
        marginLeft: 5,
      }}
    >
      <CardMedia
        sx={{ height: 280 }}
        image={image}
        title={name || "Ship Image"}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {name || "Ship Name"}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "vertical",
            gap: "8px",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Capacity:</span>{" "}
            <span style={{ color: "#ff5722" }}>{capacity || "N/A"}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
            <span style={{ color: "#4caf50" }}>{location || "N/A"}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
            <span style={{ color: "#2196f3" }}>
              {pricePerHour + " $" || "N/A"}
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Features:</span>{" "}
            <span style={{ color: "#9c27b0" }}>{shipFeatures || "N/A"}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
            <span style={{ color: currentStatusStyle.color }}>
              {isApproved || "N/A"}
            </span>
          </Typography>
        </div>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        {role === "admin" ? (
          <>
            <Button
              component={Link}
              to={`/dashboard/edit-ship/${_id}`}
              size="small"
              sx={{
                color: "white",
                background: "#BB61FF",
                "&:hover": {
                  background: "#a855f7",
                },
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              size="small"
              sx={{
                color: "white",
                background: "#BB61FF",
                "&:hover": {
                  background: "#a855f7",
                },
              }}
            >
              Delete
            </Button>
          </>
        ) : isApproved === "pending" ? (
          <Typography
            variant="body2"
            sx={{ color: "#f59e0b", fontSize: "1.2rem", textAlign: "center" }}
          >
            Booking request is pending for approval
          </Typography>
        ) : isApproved === "approved" ? (
          <Typography
            variant="body2"
            sx={{ color: "#d66a6a", fontSize: "1.2rem", textAlign: "center" }}
          >
            Ship is booked
          </Typography>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              type="date"
              name="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              size="small"
              className="btn book-btn"
              sx={{
                color: "white",
                display: "block",
                margin: "0 auto",
                background: "#BB61FF",
                "&:hover": {
                  background: "#a855f7",
                },
                position: "relative",
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-12px",
                    marginTop: "-12px",
                  }}
                />
              ) : (
                "Book"
              )}
            </Button>
          </form>
        )}
      </CardActions>
    </Card>
  );
};

export default Ship;
