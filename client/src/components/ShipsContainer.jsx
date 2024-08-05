import React from "react";
import Ship from "./Ship";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllShips";
import { useDashboardContext } from "../pages/DashboardLayout"; // Import useDashboardContext
import { Typography } from "@mui/material";

const ShipsContainer = () => {
  const { ships = [] } = useAllJobsContext(); // Default to an empty array if ships is undefined
  const { showSidebar } = useDashboardContext(); // Get sidebar visibility

  return (
    <Wrapper className={showSidebar ? "centered" : ""}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mt:-10, mb:5}}
      >
        Available Ships
      </Typography>

      {ships.length === 0 ? (
        <h2>No ships to display...</h2>
      ) : (
        <div className="jobs">
          {ships.map((ship) => (
            <Ship key={ship._id} {...ship} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default ShipsContainer;
