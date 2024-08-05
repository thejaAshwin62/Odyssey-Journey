import { AppBar, Toolbar, IconButton, styled } from "@mui/material";
import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";

// Styled AppBar with custom color and no shadow
const CustomAppBar = styled(AppBar)(({ theme, showSidebar }) => ({
  backgroundColor: "white", // Custom color
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Slight shadow
  [theme.breakpoints.down("sm")]: {
    height: "48px",
    display: showSidebar ? "none" : "flex", // Hide the navbar when sidebar is shown
  },
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    minHeight: "48px", // Adjust the Toolbar height for mobile devices
  },
}));

const LogoContainer = styled("div")(({ theme, showSidebar }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: showSidebar ? 0 : 1, // Hide logo when sidebar is shown
  visibility: showSidebar ? "hidden" : "visible", // Hide logo when sidebar is shown
  transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", // Smooth transition for opacity and visibility
  [theme.breakpoints.down("sm")]: {
    left: "45%", // Adjust position for mobile devices
    transform: "translateX(-50%)", // Adjust transform for mobile devices
  },
}));

const Navbar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();

  return (
    <CustomAppBar position="sticky" showSidebar={showSidebar}>
      <CustomToolbar>
        <IconButton
          edge="start"
          sx={{ color: "#BB61FF" }} // Change color here
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </IconButton>

        {/* Centered Logo */}
        <LogoContainer showSidebar={showSidebar}>
          <Logo />
        </LogoContainer>

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
      </CustomToolbar>
    </CustomAppBar>
  );
};

export default Navbar;
