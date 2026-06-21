import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import Loader from "../../Component/Loader";
import Avatar from "../../Component/Avatar";
import { fetchBlogs, STATUSES } from "../../Store/Slice/AllBlogsSlice";
import { deleteBlog, fetchBlog } from "../../Store/Slice/SingleBlog";
import {
  addComment,
  decreaseLike,
  increaseLike,
} from "../../Store/Slice/UserAuthentication";

const BlogDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const id = params.id;
  const user = useSelector((state) => state.user.data.user);
  const blog = useSelector((state) => state.singleBlog.data.blog);
  const status = useSelector((state) => state.singleBlog.status);

  const handleDelete = async () => {
    setIsLoading(true);
    const res = await dispatch(deleteBlog(blog?._id));
    setIsLoading(false);
    if (res.payload?.success) {
      toast.success("Blog deleted");
      dispatch(fetchBlogs());
      navigate("/");
    } else {
      toast.error(res.payload?.message || "Failed to delete blog");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(fetchBlog(id));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, id]);

  useEffect(() => {
    if (blog && blog.likes !== 0) {
      setLikeCount(blog?.likes);
      user?.likedBlogs.forEach((liked) => {
        liked.toString() === blog._id.toString() && setIsLiked(true);
      });
    }
  }, [user, blog]);

  const like = async () => {
    setIsLiked(true);
    const res = await dispatch(increaseLike(blog?._id));
    if (res.payload.success) {
      setLikeCount((count) => count + 1);
    } else {
      toast.error(res.payload.message);
    }
  };

  const dislike = async () => {
    dispatch(decreaseLike(blog?._id));
    setIsLiked(false);
    if (likeCount >= 1) setLikeCount((count) => count - 1);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const res = await dispatch(addComment({ comment, id: blog?._id }));
    if (res.payload.success) {
      toast.success("Comment added");
      setComment("");
    } else {
      toast.error(res.payload.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#181A2A] md:px-16 px-5">
        <Header />
        {isLoading || status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          /* Constrained reading width, centred */
          <div className="max-w-3xl mx-auto mt-6 pb-16 space-y-6">

            {/* Category tag */}
            <span className="inline-block bg-[#4B6BFB] text-white text-sm px-3 py-1 rounded-lg capitalize">
              {blog?.category}
            </span>

            {/* Title */}
            <h1 className="text-[#181A2A] dark:text-white md:text-4xl text-2xl font-semibold leading-snug">
              {blog?.title}
            </h1>

            {/* Author row + actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center space-x-4">
                <Link to={`/author/${blog?.author._id}`} className="flex items-center space-x-2">
                  <Avatar src={blog?.author.avatar} name={blog?.author.name} size="h-9 w-9" />
                  <span className="text-[#696A75] capitalize text-base">{blog?.author.name}</span>
                </Link>
                <span className="text-[#696A75] text-sm">
                  <ReactTimeAgo date={blog?.createdAt ? new Date(blog.createdAt).getTime() : Date.now()} locale="en-US" />
                </span>
              </div>

              {/* Edit / delete / like */}
              <div className="flex items-center space-x-4">
                {user && blog?.author && String(user._id) === String(blog.author._id) && (
                  <>
                    <Link to={`/blog/edit/${blog?._id}`}>
                      <RiFileEditFill size={22} className="text-[#4B6BFB]" />
                    </Link>
                    <MdDelete
                      size={22}
                      className="text-red-500 cursor-pointer"
                      onClick={handleDelete}
                    />
                  </>
                )}
                <button
                  onClick={isLiked ? dislike : like}
                  className="flex items-center space-x-1"
                >
                  {isLiked
                    ? <FaStar size={20} className="text-red-500" />
                    : <FaRegStar size={20} className="text-[#696A75]" />
                  }
                  <span className="text-[#696A75] text-sm">{likeCount}</span>
                </button>
              </div>
            </div>

            {/* Cover image */}
            <img
              src={blog?.coverImage}
              className="w-full rounded-xl"
              alt={blog?.title}
            />

            {/* Body */}
            <div
              className="dark:text-[#BABABF] text-[#3B3C4A] md:text-xl text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />

            {/* Divider */}
            <div className="border-t border-[#E8E8EA] dark:border-[#242535]" />

            {/* Comment form */}
            <form onSubmit={handlePostComment} className="space-y-3">
              <h2 className="text-[#181A2A] dark:text-white text-lg font-medium">
                Add a comment
              </h2>
              <textarea
                className="w-full dark:bg-[#181A2A] dark:text-white text-base outline-none dark:border-[#242535] border-2 px-4 py-3 border-[#E8E8EA] resize-none rounded-lg"
                rows={3}
                placeholder="Write your thoughts…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="bg-[#4B6BFB] text-white text-base px-6 py-2 rounded-lg"
                type="submit"
              >
                Post
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-4">
              <h2 className="text-[#181A2A] dark:text-white text-lg font-medium">
                Comments {blog?.comments.length > 0 && `(${blog.comments.length})`}
              </h2>
              {blog?.comments.length !== 0 ? (
                blog.comments
                  .slice()
                  .reverse()
                  .map((c, idx) => (
                    <div
                      key={idx}
                      className="w-full p-4 rounded-2xl space-y-2 dark:border-[#242535] border-2 border-[#E8E8EA]"
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar
                          src={c.userId.avatar}
                          name={c.userId.name}
                          size="h-8 w-8"
                        />
                        <span className="text-[#696A75] text-base capitalize font-medium">
                          {c.userId.name}
                        </span>
                      </div>
                      <p className="text-[#3B3C4A] dark:text-[#BABABF] text-base pl-10">
                        {c.comment}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-[#696A75] italic">No comments yet</p>
              )}
            </div>

          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDescription;
