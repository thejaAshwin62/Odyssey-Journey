import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const checkTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User, Read Only!");
  next();
};

export const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user && user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
};
