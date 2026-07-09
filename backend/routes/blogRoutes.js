const { get } = require("mongoose");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlog,
  deleteBlog,
  updateBlog,
  increaseLike,
  decreaseLike,
  addComment,
  fetchAuthorBlogsAndCredential,
  searchBlogs,
  getSliderContent,
} = require("../controllers/blogController");
const isAuthenticated = require("../middleware/auth");
const validateZod = require("../middleware/validateZod");
const upload = require("../middleware/multer");
const createBlogSchema = require("../validator/blog.schema");
const { cacheMiddleware } = require("../middleware/cachedMiddleware");

const router = require("express").Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("coverImage"), validateZod(createBlogSchema),createBlog);

router.route("/blogs").get(cacheMiddleware,getAllBlogs);
router
  .route("/blog/:id")
  .get(cacheMiddleware, getSingleBlog)
  .delete(isAuthenticated, deleteBlog)
  .put(isAuthenticated, upload.single("coverImage"), updateBlog);
router.route("/myBlogs").get(isAuthenticated, cacheMiddleware,getMyBlog);
router.route("/like/:id").post(isAuthenticated, increaseLike);
router.route("/unlike/:id").post(isAuthenticated, decreaseLike);
router.route("/addcomment/:id").post(isAuthenticated, addComment);
router.route("/author/:id").get(isAuthenticated,cacheMiddleware, fetchAuthorBlogsAndCredential);
router.route("/search").post(isAuthenticated, searchBlogs);
router.route("/carousel").get(getSliderContent);
module.exports = router;
