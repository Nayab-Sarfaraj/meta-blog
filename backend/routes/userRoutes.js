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
const { authLimiter } = require("../middleware/rateLimiter");
const router = require("express").Router();
const zodValidator = require("../middleware/validateZod")
const {registerSchema, loginSchema} = require("../validator/ user.schema")

router
  .route("/upload/profilePic")
  .post(isAuthenticated, upload.single("profilePic"), uploadProfilePhoto);

router.route("/resetPassword/:token").put(authLimiter,resetPassword);
router.route("/register").post(authLimiter,zodValidator(registerSchema),register);
router.route("/login").post(authLimiter,zodValidator(loginSchema),login);
router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(authLimiter,forgotPassword);
router.route("/updatePassword").patch(isAuthenticated, updatePassword);
router.route("/completeProfile").put(isAuthenticated, completeProfile);

module.exports = router;
