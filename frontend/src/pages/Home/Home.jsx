import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCarousel from "../../Component/CustomCarousel";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import PostCard from "../../Component/PostCard";
import { getCarousel } from "../../Store/Slice/carouselSlice";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.data.blogs);

  const carouselData = useSelector((state) => state.carousel.data.blogs);
  useEffect(() => {
    dispatch(getCarousel());
  }, []);

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        <CustomCarousel data={carouselData} />
        <div className="text-xl mt-10 font-semibold">Latest Posts</div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-4">
          {blogs?.map((blog) => (
            <PostCard blog={blog} key={blog._id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
