const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const ErrorHandler = require("../utils/errorhandler");
const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findOne({ _id: id, author: req.user._id });

    if (!blog) return next(new ErrorHandler("blog not found", 404));
    let url = "";
    if (req.file?.path) {
      // console.log("hsa");
      const filePath = req?.file?.path;
      url = await uploadOnCloudinary(filePath);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...req.body, coverImage: url ? url.url : req.body.coverImage },
      {
        new: true,
      }
    );
    return res.json({ success: true, updatedBlog });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedBlog = await Blog.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!deletedBlog) return next(new ErrorHandler("Blod not found", 404));
    return res.json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const getMyBlog = async (req, res, next) => {
  try {
    const myBlogs = await Blog.find({ author: req.user._id });
    return res.json({ success: true, myBlogs });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const getSingleBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    id;
    const blog = await Blog.findById(id)
      .populate("author")
      .populate({ path: "comments.userId", select: "name avatar" });
    // console.log(blog);
    if (!blog) return next(new ErrorHandler("Blog not found", 404));
    return res.json({ success: true, blog });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const getAllBlogs = async (req, res, next) => {
  try {
    const blogsPerPage = 6;
    const page = req.query.page;
    const toBeSkipped = Math.abs(blogsPerPage * (page - 1));
    const blogs = await Blog.find()
      .limit(blogsPerPage)
      .skip(toBeSkipped)
      .sort({ createdAt: -1 })
      .populate("author");
    // console.log(blogs);
    return res.json({ success: true, blogs });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const createBlog = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { description, title, category } = req.body;
    // console.log(req.file);
    const filePath = req.file?.path;
    if (!description || !title || !category || !filePath)
      return next(new ErrorHandler("All fields are required", 500));

    const coverImage = await uploadOnCloudinary(filePath);
    // console.log(coverImage);
    const newBlog = new Blog({
      description,
      title,
      author: req.user._id,
      coverImage: coverImage.url,
      category,
    });

    const savedBlog = await newBlog.save();

    return res.json({
      success: true,
      savedBlog,
    });
  } catch (error) {
    // console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};
const increaseLike = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("You are not authorized", 400));
    const blogId = req.params.id;
    const isLiked = user.likedBlogs.includes(blogId);
    if (isLiked) return res.json({});
    const blog = await Blog.findById(blogId);
    blog.likes += 1;
    user.likedBlogs.push(blogId);
    const updatedBlog = await blog.save();
    const updatedUser = await user.save();
    return res
      .status(200)
      .json({ success: true, blog: updatedBlog, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const decreaseLike = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("You are not authorized", 400));
    const blogId = req.params.id;
    const isLiked = user.likedBlogs.includes(blogId);
    if (!isLiked) return res.json({});

    const blog = await Blog.findById(blogId);
    blog.likes -= 1;
    const filteredLikedBlogs = user.likedBlogs.filter(
      (blog) => blog.toString() !== blogId.toString()
    );
    user.likedBlogs = filteredLikedBlogs;
    const updatedBlog = await blog.save();
    const updatedUser = await user.save();
    return res.status(200).json({ success: true, updatedBlog, updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const addComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = req.body.comment;
    const userId = req.user._id;
    const blog = await Blog.findById(id)
      .populate("author")
      .populate({ path: "comments.userId", select: "name avatar" });
    const isExist = blog.comments.findIndex(
      (blog) => blog.userId.toString() === userId.toString()
    );

    if (isExist !== -1) {
      blog.comments[isExist].comment = comment;
    } else {
      blog.comments.push({ userId, comment });
    }

    const savedBlog = await blog.save();
    return res.status(200).json({ success: true, blog: savedBlog });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const fetchAuthorBlogsAndCredential = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const blogs = await Blog.find({ author: authorId });
    const author = await User.findById(authorId);
    return res.status(200).json({ success: true, blogs, author });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const searchBlogs = async (req, res, next) => {
  try {
    console.log("searching blogs");
    const searchQuery = req.query.searchInput;
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive match for title
        {
          author: await User.find({
            name: { $regex: searchQuery, $options: "i" },
          }).distinct("_id"),
        },
      ],
    }).populate("author", "name avatar");

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const getSliderContent = async (req, res, next) => {
  try {
    let blogs = await Blog.find().populate("author", "name");
    let shiffled = shuffleArr(blogs);
    shiffled = shiffled.slice(0, 4);
    return res.status(200).json({ success: true, blogs: shiffled });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const shuffleArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
module.exports = {
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
};
