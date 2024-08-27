import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log("Received token:", token); // Log token

  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findById(req.user.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Admins only" });
    }
  } catch (error) {
    next(error);
  }
};
