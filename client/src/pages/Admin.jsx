import React from "react";
import {
  FaSuitcaseRolling,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaHourglassStart,
} from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatsItem } from "../components";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// Styled components for table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#BB61FF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Loader function to fetch data
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    console.log(response);

    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const AdminPage = () => {
  const { users, ships, bookedShips, bookingsData } = useLoaderData();
  

  const handleStatusChange = async (bookingId, newStatus) => {
     

    try {
      await customFetch.patch(`/ships/bookings/${bookingId}/status`, {
        status: newStatus,
      });
      toast.success("Booking status updated successfully.");
      window.location.reload(); // Consider a better state management approach
    } catch (error) {
      toast.error("Failed to update booking status.");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await customFetch.delete(`/ships/bookings/${bookingId}`);
      toast.success("Booking deleted successfully.");
      window.location.reload(); // Consider a better state management approach
    } catch (error) {
      toast.error("Failed to delete booking.");
    }
  };

  const totalApprovedBookings = bookingsData.reduce(
    (total, item) => total + item.approvedBookings,
    0
  );
  const totalPendingBookings = bookingsData.reduce(
    (total, item) => total + item.pendingBookings,
    0
  );
  const totalCanceledBookings = bookingsData.reduce(
    (total, item) => total + item.canceledBookings,
    0
  );


  return (
    <div>
      {/* Statistics Section */}
      <Wrapper>
        <StatsItem
          title="Current Users"
          count={users}
          color="#e9b949"
          bcg="#fcefc7"
          icon={<FaSuitcaseRolling />}
        />
        <StatsItem
          title="Total Ships"
          count={ships}
          color="#647acb"
          bcg="#e0e8f9"
          icon={<FaCalendarCheck />}
        />
        <StatsItem
          title="Approved Bookings"
          count={totalApprovedBookings}
          color="#4caf50" // Green color for approved bookings
          bcg="#e8f5e9" // Light green background
          icon={<FaCheckCircle />}
        />
        <StatsItem
          title="Pending Bookings"
          count={totalPendingBookings}
          color="#ff9800" // Orange color for pending bookings
          bcg="#fff3e0" // Light orange background
          icon={<FaClock />}
        />
        <StatsItem
          title="Canceled Bookings"
          count={totalCanceledBookings}
          color="#f44336" // Red color for canceled bookings
          bcg="#ffebee" // Light red background
          icon={<FaBan />}
        />
      </Wrapper>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Ship Name</StyledTableCell>
              <StyledTableCell>Price Per Hour</StyledTableCell>
              <StyledTableCell>Ship Features</StyledTableCell>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedShips.map((booking) => (
              <StyledTableRow key={booking.bookingId}>
                <StyledTableCell component="th" scope="row">
                  {booking.userName}
                </StyledTableCell>
                <StyledTableCell>{booking.shipName}</StyledTableCell>
                <StyledTableCell>{booking.pricePerHour}</StyledTableCell>
                <StyledTableCell>{booking.shipFeatures}</StyledTableCell>
                <StyledTableCell>
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <Select
                      value={booking.isApproved}
                      onChange={(e) =>
                        handleStatusChange(booking.bookingId, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteBooking(booking.bookingId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPage;
