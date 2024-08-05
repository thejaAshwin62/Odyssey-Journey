import React from "react";
import { Box } from "@mui/material";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import StatsItem from "../components/StatItem";
import StatsGraph from "../components/StatsGraph";

const AdminStats = ({ adminStats }) => (
  <div>
    <h4 className="form-title">Admin Statistics</h4>
    <div className="content-center">
      <StatsItem
        title="Current Users"
        count={adminStats.users}
        color="#f59e0b"
        bcg="#fef3c7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="Total Ships"
        count={adminStats.ships}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </div>
    <div style={{paddingTop:"60px"}}>
      <StatsGraph
        shipsData={adminStats.shipsData || []}
        bookingsData={adminStats.bookingsData || []}
      />
    </div>
  </div>
);

export default AdminStats;
