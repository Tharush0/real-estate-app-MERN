import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js';


export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body; // Add role
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role }); // Save role

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials!"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest, isAdmin: validUser.isAdmin });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // User exists, generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, isAdmin: user.role === "property_owner" });
    } else {
      // User does not exist, create new user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        role: req.body.role || "customer",
      });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...rest, isAdmin: newUser.role === "property_owner" });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json("User has been signed out!");
  } catch (error) {
    next(error);
  }
};