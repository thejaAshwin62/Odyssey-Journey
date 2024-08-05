import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/UserSchema.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "User created" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    console.log(user);

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }
    const token = createJWT({ userId: user._id, role: user.role });
    console.log(token);
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      // secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "Login successful" });
  } catch (error) {
    next(error);
  }
};









// req.body.createdBy = req.user.userId;
// const ship = await Ship.create(req.body);
// res.status(StatusCodes.CREATED).json({ ship });