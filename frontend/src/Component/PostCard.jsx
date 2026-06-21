import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";

const PostCard = ({ blog }) => {
  // author may be a populated object or a raw ID string
  const authorName = typeof blog.author === "object" ? blog.author?.name : "";
  const authorAvatar = typeof blog.author === "object" ? blog.author?.avatar : "";

  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden dark:border-[#242535] border-2 border-[#E8E8EA]">
        <div className="w-full h-48 overflow-hidden shrink-0">
          <img
            src={blog.coverImage}
            className="w-full h-full object-cover"
            alt={blog.title}
          />
        </div>
        <div className="flex flex-col flex-1 p-5 space-y-3">
          <p className="text-[#4B6BFB] text-sm capitalize">{blog.category}</p>
          <h3 className="text-[#181A2A] dark:text-[#FFFFFF] md:text-xl text-lg flex-1">
            {blog?.title}
          </h3>
          <div className="flex flex-row items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <Avatar src={authorAvatar} name={authorName} size="h-7 w-7" />
              <div className="text-[#97989F] text-sm capitalize">{authorName}</div>
            </div>
            <div className="text-[#97989F] text-sm">
              <ReactTimeAgo date={new Date(blog.createdAt).getTime()} locale="en-US" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
