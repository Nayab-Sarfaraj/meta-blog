import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = ({ isVisible, onClose, changeTheme }) => {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="fixed inset-0 z-50 md:hidden pointer-events-none">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`absolute left-0 top-0 h-full w-64 bg-[#FFFFFF] dark:bg-[#181A2A]  shadow-lg transform transition-transform duration-300 ease-in-out
                ${
                  isVisible
                    ? "translate-x-0 pointer-events-auto"
                    : "-translate-x-full"
                }`}
      >
        {/* STACK ITEMS VERTICALLY */}
        <div className="p-6 flex flex-col space-y-6 text-[#3B3C4A] dark:text-white font-medium">
          <Link to="/" onClick={onClose}>
            Home
          </Link>
          <Link to="/blogs" onClick={onClose}>
            Blogs
          </Link>
          <Link to="/myBlogs" onClick={onClose}>
            My Blogs
          </Link>
          <Link to="/search" onClick={onClose}>
            Search
          </Link>
          <Link to="/create" onClick={onClose}>
            Create
          </Link>
          <Link to="/setting" onClick={onClose}>
            Settings
          </Link>
          <button onClick={changeTheme} className="self-start">
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
