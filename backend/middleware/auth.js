const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("Token:", token);
    if (!token) return next(new ErrorHandler("You are not authorized ", 401));
    // fetching the user info hidden inside the jwt token
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    // fetching the user info and styoring it so that it can be accessed later for authentication password checking etyc
    console.log("Decoded Data:", decodedData);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {

    return next(new ErrorHandler(error.message, 401));
  }
};

module.exports = isAuthenticated;
