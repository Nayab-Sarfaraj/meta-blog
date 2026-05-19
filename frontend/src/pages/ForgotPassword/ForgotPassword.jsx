import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { forgotPassword } from "../../Store/Slice/UserAuthentication";
import Loader from "../../Component/Loader";
import { BiLoader } from "react-icons/bi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(forgotPassword(email));
    setIsLoading(false);
    if (res.payload.success) {
      toast.success(res.payload.message);
      setEmail("");
    } else {
      toast.error(res.payload.message);
    }
  };

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col space-y-4 mt-10 md:w-[520px] w-full mx-auto">
            <h1 className="text-3xl font-semibold dark:text-white text-[#181A2A]">Forgot Password</h1>
            <p className="text-[#696A75] dark:text-[#97989F] text-base">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                placeholder="Enter your email"
                className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <button
                type="submit"
                className="bg-[#4B6BFB] text-white text-lg px-10 py-2 self-start rounded-lg flex items-center gap-2"
              >
                Submit
                {isLoading && <BiLoader className="animate-spin" />}
              </button>
            </form>
            <div className="border-t border-[#E8E8EA] dark:border-[#242535] pt-4">
              <div className="underline text-[#4B6BFB] italic">
                <Link to="/login">Back to Login</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
