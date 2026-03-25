const { ErrorResponse } = require("../utils/apiResponse");

module.exports = (err, req, res, next) => {
  // Make sure the status exists on the error object

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  ErrorResponse(res,{
    message,
    statusCode,
    success:false,
   error:process.env.NODE_ENV === "development" ? err : null
  })

};
