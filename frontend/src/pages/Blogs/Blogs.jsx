import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import PostCard from "../../Component/PostCard";
import { fetchBlogs, STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";

const Blogs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const blogs = useSelector((state) => state.blogs.data.blogs);
  const status = useSelector((state) => state.blogs.status);

  const handlePage = async (e, pageNo) => {
    if (blogs?.length < 6 && page < pageNo) return;

    setPage(pageNo);
    const res = await dispatch(fetchBlogs(pageNo));
  };
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />

        <div className="text-xl mt-10 font-semibold dark:text-[#FFFFFF] text-[#181A2A]">
          Latest Posts
        </div>
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-4">
              {blogs?.map((blog) => (
                <PostCard blog={blog} key={blog._id} />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mt-10">
              <Pagination
                count={5}
                color="primary"
                page={page}
                onChange={handlePage}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
