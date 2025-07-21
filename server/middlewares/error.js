import logger from "../utils/logger.js";

// Custom Error Class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Optional: log when error is constructed
    logger.warn(`ErrorHandler created: ${message} (${statusCode})`);
  }
}

// Global Error Middleware
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongoose Errors
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  if (err.code === 11000) {
    err = new ErrorHandler(
      `Duplicate field value entered: ${Object.keys(err.keyValue)}`,
      400
    );
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    err = new ErrorHandler(`Validation failed: ${errors.join(", ")}`, 400);
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("JSON Web Token is invalid. Try again.", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(
      "JSON Web Token has expired. Please login again.",
      400
    );
  }

  if (err.name === "NotBeforeError") {
    err = new ErrorHandler("JWT not active yet. Try again later.", 400);
  }

  // JSON Syntax Error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    err = new ErrorHandler("Invalid JSON payload in request.", 400);
  }

  // ✅ Winston logs the error here
  logger.error(`[${req.method}] ${req.originalUrl} >> ${err.message}`, {
    statusCode: err.statusCode,
    stack: err.stack,
    user: req.user?.id || "Guest",
  });

  // Final error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
