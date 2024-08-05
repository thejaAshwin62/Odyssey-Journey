import { Router } from "express";

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  updateShipApproval,
  
} from "../Controllers/userController.js";
import { getUserBookings } from "../Controllers/BookedShip.js";
import { getStats } from "../Controllers/statsContoller.js";


router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [getApplicationStats, getStats]);
router.patch("/update-user", updateUser)
router.post("/:id/update-status", updateShipApproval);

//view-booked ships
router.get("/booked-details/:userId", getUserBookings);

export default router;
