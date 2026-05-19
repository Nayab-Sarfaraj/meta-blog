import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { MdCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfilePicture } from "../../Store/Slice/UserAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import { BiLoader } from "react-icons/bi";
import Avatar from "../../Component/Avatar";

const UpdateProfilePic = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data?.user);
  const isLoading = useSelector((state) => state.user.status);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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
          className="flex flex-col items-center space-y-4 justify-center mt-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold dark:text-white text-[#181A2A]">Update Profile Picture</h1>

          {/* Clickable avatar */}
          <label className="relative cursor-pointer group">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="preview"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : (
              <Avatar
                src={user?.avatar}
                name={user?.name}
                size="h-40 w-40"
              />
            )}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <MdCameraAlt size={28} className="text-white" />
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              name="profilePic"
              accept="image/*"
            />
          </label>

          <p className="text-sm text-[#696A75] dark:text-[#97989F]">Click the photo to select a new image</p>

          <button
            type="submit"
            disabled={!profilePic}
            className="bg-[#4B6BFB] text-white text-lg px-10 py-1 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
            {isLoading === STATUSES.LOADING && <BiLoader className="animate-spin" />}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProfilePic;
