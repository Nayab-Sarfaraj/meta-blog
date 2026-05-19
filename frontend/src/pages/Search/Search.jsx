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
  const [hasSearched, setHasSearched] = useState(false);
  const status = useSelector((state) => state.searchResult.status);
  const blogs = useSelector((state) => state.searchResult.data.blogs);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setHasSearched(true);
    dispatch(searchBlogs(searchInput));
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />

        {/* Search bar */}
        <div className="mt-8 mb-6">
          <h1 className="text-3xl font-semibold text-[#181A2A] dark:text-white mb-4">Search</h1>
          <form onSubmit={handleSubmit} className="flex items-center max-w-xl">
            <input
              placeholder="Search by title or author…"
              className="flex-1 dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-l-lg border-r-0"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
            />
            <button
              className="bg-[#4B6BFB] text-white px-5 py-3 rounded-r-lg border-2 border-[#4B6BFB] flex items-center"
              type="submit"
            >
              <IoMdSearch size={24} />
            </button>
          </form>
        </div>

        {/* Results */}
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : hasSearched ? (
          blogs?.length > 0 ? (
            <>
              <p className="text-[#696A75] dark:text-[#97989F] text-sm mb-4">
                {blogs.length} result{blogs.length !== 1 ? "s" : ""} for "{searchInput}"
              </p>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 items-stretch">
                {blogs.map((blog) => (
                  <PostCard blog={blog} key={blog._id} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-16 text-[#696A75] dark:text-[#97989F]">
              <TbError404 size={80} />
              <p className="text-xl mt-3">No results for "{searchInput}"</p>
              <p className="text-sm mt-1">Try a different title or author name</p>
            </div>
          )
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default Search;
