import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfilePicture } from "../../Store/Slice/UserAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import { BiLoader } from "react-icons/bi";

const UpdateProfilePic = () => {
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data?.user);
  const isLoading = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    const res = await dispatch(UpdateProfilePicture(formData));
    if (res.payload.success) {
      toast.success("Updated profile picture");
      navigate("/");
    } else toast.error(res.payload.message);
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        <form
          className="flex flex-col items-center space-y-4 justify-center"
          onSubmit={handleSubmit}
        >
          {user ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="h-60 w-60 rounded-full"
            />
          ) : (
            <FaUserCircle
              size={200}
              className="text-[#3B3C4A] dark:text-[#FFFFFF] "
            />
          )}
          <input
            type="file"
            className=" dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 md:px-5 md:py-2 p-1
                    border-[#E8E8EA]"
            onChange={(e) => setProfilePic(e.target.files[0])}
            name="profilePic"
          />

          <button
            className="bg-[#4B6BFB] text-white text-lg px-10 py-1  rounded-lg flex items-center justify-center gap-3"
            type="submit"
          >
            Submit
            {isLoading === STATUSES.LOADING && (
              <BiLoader className="animate-spin" />
            )}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfilePic;
