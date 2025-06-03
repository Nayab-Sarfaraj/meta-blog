import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Store/Slice/ThemeSlice";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import profilePic from "../../assets/profile.png";
import descriptionImg from "../../assets/desciption.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, fetchBlog } from "../../Store/Slice/SingleBlog";
import ReactTimeAgo from "react-time-ago";
import Loader from "../../Component/Loader";
import { fetchBlogs, STATUSES } from "../../Store/Slice/AllBlogsSlice";
import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import {
  addComment,
  decreaseLike,
  increaseLike,
} from "../../Store/Slice/UserAuthentication";
import toast from "react-hot-toast";
const BlogDescription = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState([]);
  const id = params.id;
  const user = useSelector((state) => state.user.data.user);
  const blog = useSelector((state) => state.singleBlog.data.blog);
  const status = useSelector((state) => state.singleBlog.status);
  const handleDelete = async () => {
    setIsLoading(true);
    const res = await dispatch(deleteBlog(blog._id));

    if (res.payload.success) navigate("/");
    setIsLoading(false);
    dispatch(fetchBlogs());
  };
  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(fetchBlog(id));

    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [params, id]);
  useEffect(() => {
    if (blog && blog.likes !== 0) {
      setLikeCount(blog.likes);
      user?.likedBlogs.forEach((liked) => {
        liked.toString() === blog._id.toString() && setIsLiked(true);
      });
    }
  }, [user, blog]);

  const like = async () => {
    setIsLiked(true);
    dispatch(increaseLike(blog._id));
    setLikeCount((count) => count + 1);
  };
  const dislike = async () => {
    dispatch(decreaseLike(blog._id));
    setIsLiked(false);
    if (likeCount >= 1) setLikeCount((count) => count - 1);
  };
  const handlePostComment = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await dispatch(addComment({ comment, id: blog._id }));
    await fetchData();
    setIsLoading(false);
    setComment("");
    toast.success("comment added");
  };
  return (
    <>
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#181A2A] md:px-16 px-5">
        <Header />
        {isLoading || status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <div className="mt-5 md:mx-40 space-y-3 mx-7">
            <button className="bg-[#4B6BFB] text-white w-auto px-2  rounded-lg">
              {blog?.category}
            </button>
            <div className="text-[#181A2A] dark:text-white md:text-4xl text-2xl font-medium capitalize">
              {blog?.title}
            </div>
            <div className="flex items-center space-x-5 my-3">
              <Link to={`/author/${blog?.author._id}`}>
                <div className="flex items-center space-x-3">
                  <img src={blog?.author.avatar} className="h-8 rounded-full" />
                  <div className="text-[#696A75] capitalize text-lg">
                    {blog?.author.name}
                  </div>
                </div>
              </Link>
              <div className="text-[#696A75]">
                <ReactTimeAgo date={blog?.createdAt} locale="en-US" />
              </div>
            </div>

            <div className="flex flex-row items-center space-x-5">
              {user?._id.toString() === blog?.author._id ? (
                <>
                  <Link to={`/blog/edit/${blog?._id}`}>
                    <RiFileEditFill size={25} className="text-[#4B6BFB]" />
                  </Link>

                  <MdDelete
                    size={25}
                    className="text-red-500"
                    onClick={handleDelete}
                  />
                </>
              ) : null}
              {isLiked ? (
                <FaStar size={22} onClick={dislike} className="text-red-500" />
              ) : (
                <FaRegStar
                  size={22}
                  onClick={like}
                  className="text-[#696A75]"
                />
              )}
              <div className="text-[#696A75]">{likeCount}</div>
            </div>
            <img
              src={blog?.coverImage}
              className="w-full rounded-xl"
              alt="cover"
            />
            <div
              className="dark:text-[#BABABF] text-[#3B3C4A] md:text-xl text-lg my-5 pb-10"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />

            <form onSubmit={handlePostComment}>
              <div className="text-[#181A2A] dark:text-white text-lg mb-2 font-medium capitalize ">
                Add your comment
              </div>
              <textarea
                className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] resize-none rounded-2xl mb-2"
                cols={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                className="bg-[#4B6BFB] text-white text-base px-5 py-1 self-start rounded-lg"
                type="submit"
              >
                Post
              </button>
            </form>

            <div className="flex flex-col w-full h-full items-start justify-center  space-y-4 pb-4 ">
              <div className="text-[#181A2A] dark:text-white text-lg font-medium capitalize">
                Comments
              </div>
              {blog?.comments.length !== 0 ? (
                blog.comments
                  .slice()
                  .reverse()
                  .map((comment) => (
                    <div className=" w-full p-5  rounded-2xl space-y-3 dark:border-[#242535] border-2 border-[#E8E8EA]">
                      <div className="flex item-center space-x-2 justify-start">
                        <img
                          src={comment.userId.avatar}
                          className="h-8 rounded-full"
                        />

                        <div className="text-[#696A75] text-lg capitalize italic">
                          {comment.userId.name}{" "}
                        </div>
                      </div>
                      <p className="text-[#696A75] ">{comment.comment}</p>
                    </div>
                  ))
              ) : (
                <div className="text-xl text-[#696A75]   italic font-extralight">
                  No comments yet
                </div>
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
