import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/StatItem";
import Test from "../assets/images/main.svg";
import customFetch from "../utils/customFetch";
import fetchAdminStats from "../utils/fetchAdminStats"; // Import the function
import { toast } from "react-toastify";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import AdminStats from "../components/AdminStats";
import styled from "styled-components";
import empty from "../assets/images/empty.svg";

const CardMediaStyled = styled(CardMedia)`
  height: 350px;

  @media (max-width: 600px) {
    height: 250px;
  }
`;

const CardOverlayStyled = styled(Box)`
  width: 250px;
  top: 250px;
  right: 80px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 20px;
  padding: 1px;
  position: absolute;

  @media (max-width: 600px) {
    width: 200px;
    top: 200px;
    right: -20px;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px; /* Adjust height as needed */
  text-align: center;

  img {
    width: 150px; /* Adjust width as needed */
    margin-bottom: 20px;
  }

  button {
    margin-top: 20px;
  }
`;

export const loader = async () => {
  try {
    const [userResponse, shipsResponse] = await Promise.all([
      customFetch.get("/auth/me"),
      customFetch.get("/ships"),
    ]);

    return {
      userInfo: userResponse.data,
      ships: shipsResponse.data.ships || [],
    };
  } catch (error) {
    return redirect("/dashboard");
  }
};

const Stats = () => {
  const { ships, userInfo } = useLoaderData();
  const [adminStats, setAdminStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch admin stats if the user is an admin
        if (userInfo.role === "admin") {
          const adminStatsData = await fetchAdminStats();
          setAdminStats(adminStatsData);
        }

        // Fetch user bookings
        const userId = userInfo.userId;
        const response = await customFetch.get(
          `/users/booked-details/${userId}`
        );
        setBookings(response.data.bookings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Wrapper style={{ marginBottom: "100px" }}>
      <div className="content">
        {userInfo.role === "admin" && adminStats ? (
          <div>
            <AdminStats adminStats={adminStats} />
            {/* Add a gap here */}
            <div style={{ marginTop: "40px" }}></div>
          </div>
        ) : (
          <div>
            <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
              Booking Details
            </h4>

            <div className="content-center">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Box
                    key={booking._id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      position: "relative",
                      padding: 2,
                      marginBottom: 4,
                    }}
                  >
                    <Card
                      sx={{
                        width: 500,
                        boxShadow: 6,
                        position: "relative",
                      }}
                    >
                      <CardMediaStyled
                        component="img"
                        image={booking.shipImage || Test}
                        alt={booking.shipName || "Ship Image"}
                      />
                      <CardContent className="secBox">
                        <Typography gutterBottom variant="h5" component="div">
                          {booking.shipName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Booking Date:{" "}
                          <span style={{ color: "#2196f3" }}>
                            {new Date(booking.bookedAt).toLocaleDateString()}
                          </span>
                        </Typography>
                        <Divider />
                      </CardContent>
                    </Card>

                    <CardOverlayStyled className="card-overlay">
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>Capacity:</span>{" "}
                          <span style={{ color: "#ff5722" }}>
                            {booking.capacity || "N/A"}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                          <span style={{ color: "#4caf50" }}>
                            {booking.location || "N/A"}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>
                            Price per Hour:
                          </span>{" "}
                          <span style={{ color: "#2196f3" }}>
                            {booking.pricePerHour
                              ? `$ ${booking.pricePerHour}`
                              : "N/A"}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>Features:</span>{" "}
                          <span style={{ color: "#9c27b0" }}>
                            {booking.shipFeatures || "N/A"}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
                          <span
                            style={{
                              color:
                                booking.isApproved === "pending"
                                  ? "#f59e0b"
                                  : booking.isApproved === "approved"
                                  ? "#d66a6a"
                                  : "#647acb",
                            }}
                          >
                            {booking.isApproved || "N/A"}
                          </span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span style={{ fontWeight: "bold" }}>Booked:</span>{" "}
                          <span
                            style={{
                              color: booking.booked ? "#4caf50" : "#d66a6a",
                            }}
                          >
                            {booking.booked ? "Yes" : "No"}
                          </span>
                        </Typography>
                      </CardContent>
                    </CardOverlayStyled>
                  </Box>
                ))
              ) : (
                <EmptyStateContainer>
                  <img src={empty} alt="No bookings" />
                  <Typography>No bookings found.</Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#BB61FF",
                      "&:hover": {
                        backgroundColor: "#9b4dce", // Adjust hover color if needed
                      },
                    }}
                    onClick={() => navigate("/dashboard")}
                  >
                    Book Ships Now
                  </Button>
                </EmptyStateContainer>
              )}
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Stats;
