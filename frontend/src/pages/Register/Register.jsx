import React, { useState } from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Slice/UserAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await dispatch(registerUser({ name, email, password }));

    setIsLoading(false);
    if (res.payload.success) {
      toast.success("Registered successfully");

      navigate("/");
    } else toast.error(res.payload.message);
  };
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        <div className="flex flex-col items-center space-y-5  justify-center mt-10 ">
          <h1 className="text-2xl font-semibold dark:text-white text-[#181A2A]">
            Register
          </h1>
          <input
            placeholder="Enter name"
            className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <input
            placeholder="Enter email"
            className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <input
            placeholder="Enter password"
            className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button
            className="bg-[#4B6BFB] text-white text-lg px-10 py-1 self-start rounded-lg"
            onClick={handleSubmit}
          >
            Submit
            {isLoading && <BiLoader className="animate-spin" />}
          </button>
          <div className="underline text-[#4B6BFB] italic self-start">
            <Link to={"/login"}>Already a user ? Login Now</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
