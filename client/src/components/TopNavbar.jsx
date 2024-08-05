import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaAlignLeft, FaHome, FaInfoCircle } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks"; // Make sure to adjust NavLinks for the top navbar if needed

const TopNavbar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </IconButton>
        <Logo />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <NavLinks /> {/* Adjust NavLinks for a top navbar layout */}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
