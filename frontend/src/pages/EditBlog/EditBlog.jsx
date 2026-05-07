import React, { useEffect, useState } from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import DescriptionInput from "../../Component/DescriptionInput";
import { CATEGORY } from "../../constants/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editBlog } from "../../Store/Slice/SingleBlog";
import { fetchBlogs, STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";

const EditBlog = () => {
  const blog = useSelector((state) => state.singleBlog.data.blog);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [category, setCategory] = useState(blog?.category || "");
  const [coverImage, setCoverImage] = useState(blog?.coverImage || "");
  const status = useSelector((state) => state.singleBlog.status);
  const user = useSelector((state) => state.user.data.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("coverImage", coverImage);
    formData.append("title", title);
    formData.append("description", description);
    if (blog?.coverImage !== coverImage) formData.append("category", category);

    const res = await dispatch(editBlog({ formData, id: blog._id }));
    navigate("/");
    if (res.payload.success) {
      toast.success("Blog updated");
      navigate("/");
      dispatch(fetchBlogs());
    } else toast.error(res.payload.message);
  };
  useEffect(() => {
    if (user._id.toString() !== blog?.author._id.toString()) navigate("/");
    if (blog) setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog, user]);
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {isLoading || status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <form
            className="flex flex-col items-center space-y-5  justify-center mt-10 "
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-semibold dark:text-white text-[#181A2A]">
              Edit Blog Post
            </h1>
            <input
              placeholder="Enter title"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <DescriptionInput value={description} setData={setDescription} />
            <select
              name="cars"
              id="cars"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.values(CATEGORY).map((item) => (
                <option
                  value={item}
                  className=" hover:bg-[#4B6BFB] capitalize"
                  selected={category === item ? true : false}
                >
                  {" "}
                  {item}
                </option>
              ))}
            </select>

            <input
              placeholder="Enter title"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              name="coverImage"
            />

            <button className="bg-[#4B6BFB] text-white text-lg px-10 py-1 self-start rounded-lg">
              Submit
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditBlog;
