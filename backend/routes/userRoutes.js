const {
  register,
  login,
  getUserProfile,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  uploadProfilePhoto,
  completeProfile,

} = require("../controllers/userControllers");
const isAuthenticated = require("../middleware/auth");
const upload = require("../middleware/multer");
const router = require("express").Router();
router
  .route("/upload/profilePic")
  .post(isAuthenticated, upload.single("profilePic"), uploadProfilePhoto);

router.route("/resetPassword/:token").put(resetPassword);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/updatePassword").patch(isAuthenticated, updatePassword);
router.route("/completeProfile").put(isAuthenticated, completeProfile);

module.exports = router;
