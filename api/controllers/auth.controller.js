import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import pkg from "jsonwebtoken";
const { Jwt } = pkg;

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }
    const token = pkg.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expiry: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   //for encrypting the password
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   //const hashedPassword = await bcryptjs.hash(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json({
//       message: "User created successfully!",
//     });
//   } catch (error) {
//     //this "next" call directly passes the error received to the middleware code handler in index.js
//     next(error);
//   }
// };
