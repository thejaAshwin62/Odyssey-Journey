import { body, check, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { SHIP_FEATURES } from "../utils/constants.js";
import Ship from "../models/ShipModel.js";
import User from "../models/UserSchema.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          return next(new NotFoundError(errorMessages[0]));
        }
        if (errorMessages[0].startsWith("not authorized")) {
          return next(
            new UnauthorizedError("not authorized to access this route")
          );
        }
        return next(new BadRequestError(errorMessages[0]));
      }
      next();
    },
  ];
};

// export const validateShipInput = [
//   body("name").notEmpty().withMessage("name is required"),
//   body("capacity").notEmpty().withMessage("capacity is required"),
//   body("location").notEmpty().withMessage("location is required"),
//   body("pricePerHour").notEmpty().withMessage("pricePerHour is required"),
//   body("shipFeatures")
//     .isIn(Object.values(SHIP_FEATURES))
//     .withMessage("invalid features value"),
//   check("image").custom((value, { req }) => {
//     if (!req.file) {
//       throw new BadRequestError("Image file is required");
//     }
//     return true;
//   }),
// ];

export const validIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const validID = mongoose.Types.ObjectId.isValid(value);
    if (!validID) throw new BadRequestError("invalid MongoDB id");
    const ship = await Ship.findById(value);
    if (!ship) throw new NotFoundError(`no job found with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isUser = req.user.userId === ship.createdBy;
    if (!isAdmin && !isUser)
      throw new UnauthorizedError("not authorized to access this route");
  }),
]);

export const ValidateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const ValidateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),

  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);
