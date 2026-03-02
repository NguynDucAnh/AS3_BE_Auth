export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  // Mongoose validation errors -> 400
  const isValidation = err?.name === "ValidationError";
  const finalStatus = isValidation ? 400 : status;

  res.status(finalStatus).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
