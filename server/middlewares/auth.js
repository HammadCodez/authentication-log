import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import logger from "../utils/logger.js"; // Winston

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies.token ||
    (authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1]);

  if (!token) {
    logger.warn(`🔒 Auth failed: No token. [${req.method}] ${req.originalUrl}`);
    return next(new ErrorHandler("Authentication token missing.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      logger.warn(`🔒 Auth failed: User not found. Token ID: ${decoded.id}`);
      return next(new ErrorHandler("User not found.", 404));
    }

    req.user = user;
    next();
  } catch (err) {
    logger.warn(
      `🔒 Auth failed: Invalid/Expired token. Reason: ${err.message}`
    );
    return next(new ErrorHandler("Token is invalid or expired.", 401));
  }
});
