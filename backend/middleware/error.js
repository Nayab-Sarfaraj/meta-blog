module.exports = (err, req, res, next) => {
  // Make sure the status exists on the error object

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.log("send");
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
