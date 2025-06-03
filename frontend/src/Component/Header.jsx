// Header.jsx
import React, { useState } from "react";
import darkLogo from "../assets/darkLogo.png";
import lightLogo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RiMenu5Line } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { toggleTheme } from "../Store/Slice/ThemeSlice";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const Header = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [sideBar, setSideBar] = useState(false);

  const handleThemeToggle = () => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <div className="w-full flex items-center justify-between py-7 px-4 md:px-8">
      <Link to={"/"}>
        <img
          src={theme === "light" ? lightLogo : darkLogo}
          alt="logo"
          className="w-32"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="md:flex space-x-5 text-[#3B3C4A] dark:text-[#FFFFFF] hidden">
        <Link to={"/"}>Home</Link>
        <Link to={"/blogs"}>Blogs</Link>
        <Link to={"/myBlogs"}>My Blogs</Link>
        <Link to={"/search"}>Search</Link>
      </div>

      {/* Desktop Icons */}
      <div className="md:flex items-center space-x-6 hidden">
        <Link to={"/create"}>
          <FaRegSquarePlus
            size={24}
            className="text-[#3B3C4A] dark:text-[#FFFFFF]"
          />
        </Link>
        <Link to={"/setting"} className="text-[#3B3C4A] dark:text-[#FFFFFF]">
          <IoMdSettings size={24} />
        </Link>
        <button
          onClick={handleThemeToggle}
          className="text-[#3B3C4A] dark:text-[#FFFFFF]"
        >
          {theme === "light" ? (
            <MdDarkMode size={24} />
          ) : (
            <MdOutlineLightMode size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <RiMenu5Line
        className="md:hidden text-[#3B3C4A] dark:text-[#FFFFFF]"
        size={24}
        onClick={() => setSideBar(true)}
      />

      {/* Mobile Sidebar */}
      <SideBar
        isVisible={sideBar}
        onClose={() => setSideBar(false)}
        changeTheme={handleThemeToggle}
      />
    </div>
  );
};

export default Header;
