import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { resetPassword } from "../../Store/Slice/UserAuthentication";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const handleToken = async () => {
    const res = await dispatch(resetPassword({ token, password }));
    if (res.payload.success) {
      toast.success("Password reset successfully");
      navigate("/login");
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
            className="flex items-center justify-center flex-col space-y-5"
            onSubmit={handleToken}
          >
            <input
              placeholder="Enter new password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button className="bg-[#4B6BFB] text-white text-lg px-10 py-1 self-start rounded-lg">
              Submit
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
