import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
const CustomCarousel = ({ data }) => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      className=""
    >
      {data?.map((item, idx) => (
        <Link to={`/blog/${item._id}`} key={idx}>
          <div className="h-full w-full overflow-hidden">
            <img src={item?.coverImage} className="w-full h-auto rounded-2xl" />
            <div className="absolute bottom-10 text-start md:w-[50%] w-full left-5 md:space-y-3 space-y-2">
              <button
                className="bg-[#4B6BFB] text-white w-auto px-2  rounded-md capitalize
              "
              >
                {item?.category}
              </button>
              <div className="text-white dark:text-[#FFFFFF] md:text-4xl text-base font-medium ">
                {item?.title}
              </div>

              <div className="text-[#97989F] capitalize font-semibold">
                {item?.author.name}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
