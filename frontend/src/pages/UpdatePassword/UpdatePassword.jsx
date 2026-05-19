import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Store/Slice/UserAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";
import { BiLoader } from "react-icons/bi";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(updatePassword({ newPassword, oldPassword }));
    setIsLoading(false);
    if (res.payload.success) {
      toast.success("Password updated successfully");
      navigate("/");
    } else toast.error(res.payload.message);
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {status === STATUSES.LOADING ? (
          <Loader />
        ) : (
          <form
            className="flex flex-col space-y-4 mt-10 md:w-[520px] w-full mx-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-semibold dark:text-white text-[#181A2A]">Update Password</h1>
            <input
              placeholder="Enter old password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />
            <input
              placeholder="Enter new password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <button
              type="submit"
              className="bg-[#4B6BFB] text-white text-lg px-10 py-2 self-start rounded-lg flex items-center gap-2"
            >
              Submit
              {isLoading && <BiLoader className="animate-spin" />}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;
