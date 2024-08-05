import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  ValidateRegisterInput,
  ValidateLoginInput,
  Logout,
} from "../middleware/validationMiddleware.js";
import {register,login} from "../Controllers/authControllers.js"
const router = Router();
router.post("/register", ValidateRegisterInput,register);
router.post("/login",ValidateLoginInput, login);
router.get('/logout',Logout)
router.get("/me", authenticateUser, (req, res) => {
  const { userId, role } = req.user;
  res.status(200).json({ userId, role });
});

export default router;