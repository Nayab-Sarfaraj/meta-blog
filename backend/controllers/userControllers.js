const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const sendMail = require("../utils/sendEmail");
const uploadOnCloudinary = require("../utils/cloudinary");
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return next(new ErrorHandler("all fields are required", 401));
    const user = await User.findOne({ email });
    console.log(user);
    if (user) return next(new ErrorHandler("User already exist", 401));
    const newuser = await User({
      email,
      password,
      name,
      avatar: "https://shorturl.at/nOEI9",
    });

    const saveduser = await newuser.save();
    return res.json({ success: true, saveduser });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("all fields are required", 401));
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return next(new ErrorHandler("Invalid email or password", 401));

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    res.cookie("token", token);
    return res.json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return next(new ErrorHandler("invalid user credentials", 401));

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const logout = async (req, res, next) => {
  try {
    res.cookie("token", undefined);
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Email does not exist", 401));
    const response = await sendMail(email, user._id);
    console.log(response);
    return res.json({ success: true, message: "sent message successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const resetPassword = async (req, res, next) => {
  try {
    console.log("running");
    console.log(req.params);
    const token = req.params.token;
    const { password } = req.body;
    console.log(token);
    const { userId } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("Token expired", 401));
    user.password = password;
    const updatedUser = await user.save();
    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email: req.user.email });
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));
    const isMatching = await bcrypt.compare(oldPassword, user.password);
    if (!isMatching)
      return next(new ErrorHandler("Passwords doesnt match", 401));
    user.password = newPassword;
    const updatedUser = await user.save();
    return res.json({ success: true, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const uploadProfilePhoto = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const response = await uploadOnCloudinary(req.file.path);
    const user = await User.findById(req.user._id);
    user.avatar = response.url;
    const savedUser = await user.save();
    return res.json({ success: true, savedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const completeProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    let updatedUser = {};
    if (req.body.contactInfo.length !== 0) {
      console.log("kk");
      const user = await User.findById(id);
      user.contactInfo = [...req.body.contactInfo];
      if (req.body.bio) user.bio = req.body.bio;
      if (req.body.profession) user.profession = req.body.profession;
      user.name = req.body.name;
      updatedUser = await user.save();
    } else {
      updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    }
    return res.json({ success: true, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  uploadProfilePhoto,
  completeProfile,
};
