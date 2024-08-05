import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import React from "react";

const links = [
  {
    text: "all ships",
    path: ".",
    icon: <MdQueryStats />,
  },
  {
    text: "add ship",
    path: "add-ships",
    icon: <FaWpforms />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: " profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];
export default links;
