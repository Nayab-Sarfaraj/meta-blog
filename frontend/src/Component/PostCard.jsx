import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const PostCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog._id}`}>
      <div className=" w-full p-5  rounded-2xl space-y-3 dark:border-[#242535] border-2 border-[#E8E8EA]">
        <img
          src={blog.coverImage}
          className="w-full h-auto"
          alt={blog.title}
        />
        <div className="space-y-3">
          <p className="text-[#4B6BFB] text-sm">{blog.category}</p>
          <h3 className="text-[#181A2A] dark:text-[#FFFFFF] md:text-xl text-lg ">
            {blog?.title}
          </h3>
          <div className="flex flex-row items-center justify-between ">
            <div className="flex items-center space-x-3 justify-center">
              <img src={blog.author.avatar} className="h-7 rounded-full" alt={blog.author.name} />
              <div className="text-[#97989F] text-xl capitalize">
                {blog.author.name}{" "}
              </div>
            </div>
            <div className="text-[#97989F]">
              <ReactTimeAgo date={blog.createdAt} locale="en-US" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
