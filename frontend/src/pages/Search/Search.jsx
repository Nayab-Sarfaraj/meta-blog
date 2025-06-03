import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { TbError404 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import Loader from "../../Component/Loader";
import PostCard from "../../Component/PostCard";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import { searchBlogs } from "../../Store/Slice/searchSlice";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const status = useSelector((state) => state.searchResult.status);
  const blogs = useSelector((state) => state.searchResult.data.blogs);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    dispatch(searchBlogs(searchInput));
  };
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        <form
          className="flex flex-row items-center justify-center px-2 md:px-5"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Search....."
            className="w-80  dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] shadow-2xl"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
          />
          <button
            className="h-full bg-[#4B6BFB] text-white text-lg px-5 py-2 self-start border-2 border-[#4B6BFB]"
            type="submit"
          >
            <IoMdSearch size={26} />
          </button>
        </form>
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : blogs?.length !== 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-4 auto-rows-fr">
            {blogs?.map((blog) => (
              <PostCard blog={blog} key={blog._id} />
            ))}
          </div>
        ) : (
          <div className="flex w-full h-full items-center justify-center mt-10">
            <div className="flex flex-col items-center justify-center">
              <TbError404 size={120} />
              <div className="text-xl font-bold">Not Found</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;
