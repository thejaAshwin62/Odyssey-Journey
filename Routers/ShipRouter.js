import { Router } from "express";
import { validIdParam } from "../middleware/validationMiddleware.js";
import {
  createShips,
  updateShip,
  deleteShip,
  getAllShips,
  getOneShip,
} from "../Controllers/ShipControllers.js";
import { approveBooking, deleteBooking } from "../Controllers/shipApproval.js";
import { bookShipForUser } from "../Controllers/userController.js"; // Updated import
import { isAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Ship routes
router.route("/").post(isAdmin, createShips).get(getAllShips);

router
  .route("/:id")
  .get(validIdParam, getOneShip)
  .patch(validIdParam, updateShip)
  .delete(validIdParam, deleteShip);



// Book a ship
router.post("/:shipId/book/:userId", bookShipForUser);

router.patch("/bookings/:bookingId/status", isAdmin, approveBooking);

router.delete("/bookings/:bookingId", deleteBooking);


export default router;
