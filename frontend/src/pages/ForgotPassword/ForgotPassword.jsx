import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { forgotPassword } from "../../Store/Slice/UserAuthentication";
import Loader from "../../Component/Loader";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(forgotPassword(email));
    console.log(res);
    if (res.payload.success) {
      setIsLoading(false);
      toast.success(res.payload.message);
      setEmail("");
    } else {
      toast.error(res.payload.message);

      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <form
            className="flex items-center justify-center flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Enter your email"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
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

export default ForgotPassword;
