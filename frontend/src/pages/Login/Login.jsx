import React, { useState } from "react";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { loginUser } from "../../Store/Slice/UserAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const status = useSelector((state) => state.user.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(loginUser({ email, password }));
    setIsLoading(false);
    if (res.payload.success) {
      toast.success("Logged in successfully");
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
          <div className="flex flex-col space-y-4 mt-10 md:w-[520px] w-full mx-auto">
            <h1 className="text-3xl font-semibold dark:text-white text-[#181A2A]">Login</h1>
            <input
              placeholder="Enter email"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <input
              placeholder="Enter password"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <button
              className="bg-[#4B6BFB] text-white text-lg px-10 py-2 self-start rounded-lg flex items-center gap-2"
              onClick={handleSubmit}
            >
              Submit
              {isLoading && <BiLoader className="animate-spin" />}
            </button>
            <div className="border-t border-[#E8E8EA] dark:border-[#242535] pt-4 flex flex-col space-y-2">
              <div className="underline text-[#4B6BFB] italic">
                <Link to="/register">New User? Register Now</Link>
              </div>
              <div className="underline text-[#4B6BFB] italic">
                <Link to="/forgotPassword">Forgot password</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
