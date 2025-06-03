import React, { useState } from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import DescriptionInput from "../../Component/DescriptionInput";
import { CATEGORY } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../Store/Slice/CreateBlog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchBlogs, STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.createBlog.status);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("coverImage", coverImage);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    const res = await dispatch(createBlog(formData));
    if (res.payload.success) {
      toast.success("Blog created");
      dispatch(fetchBlogs());
      navigate("/");
    } else toast.error(res.payload.message);
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <form
            className="flex flex-col items-center space-y-5  justify-center mt-10 "
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-semibold dark:text-white text-[#181A2A]">
              Create Blog Post
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
                <option value={item} className=" hover:bg-[#4B6BFB] capitalize">
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

            {/* <div class="relative w-full">
                        <input id="file-upload" type="file" class="sr-only" onChange={(e) => setCoverImage(e.target.files[0])} name='coverImage' />
                        <label for="file-upload" class="cursor-pointer w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-2 border-[#E8E8EA] flex items-center justify-between">

                            <span class="bg-blue-600 text-white px-4 py-2 rounded-md">Cover Image</span>
                        </label>
                    </div> */}

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

export default CreateBlog;
