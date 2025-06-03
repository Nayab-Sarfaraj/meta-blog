import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Store/Slice/UserAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(updatePassword({ newPassword, oldPassword }));
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
          <form className="flex flex-col items-center space-y-5  justify-center mt-10 ">
            <h1 className="text-2xl font-semibold">Update Password</h1>
            <input
              placeholder="Enter old password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
            />
            <input
              placeholder="Enter new password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <button
              className="bg-[#4B6BFB] text-white text-lg px-10 py-1 self-start rounded-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;
