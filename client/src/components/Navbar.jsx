import { AppBar, Toolbar, IconButton, styled } from "@mui/material";
import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";

// Styled AppBar with custom color and no shadow
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white", // Custom color
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Slight shadow
}));

const Navbar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();

  return (
    <CustomAppBar position="sticky">
      <Toolbar
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton
          edge="start"
          sx={{ color: "#BB61FF" }} // Change color here
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </IconButton>

        {/* Centered Logo */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: showSidebar ? 1 : 0, // Smoothly transition the opacity
            visibility: showSidebar ? "visible" : "hidden", // Hide or show element
            transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", // Smooth transition for opacity and visibility
          }}
        >
          <Logo />
        </div>

        {/* Logout Container */}
        <div
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            transition: "right 0.3s ease-in-out", // Smoothly transition the position
          }}
        >
          <LogoutContainer />
        </div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navbar;
