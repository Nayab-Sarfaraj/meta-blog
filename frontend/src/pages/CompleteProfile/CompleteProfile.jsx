import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";
import { FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import DropDownInput from "../../Component/DropDownInput";
import { WRITER_PROFESSIONS } from "../../constants/constant";
import { contacts } from "../../constants/constant";

import { completeProfile } from "../../Store/Slice/UserAuthentication";
import toast from "react-hot-toast";
const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  // const [contactInfo, setContactInfo] = useState([])
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const navigate = useNavigate();
  const status = useSelector((state) => state.user?.status);
  const user = useSelector((state) => state.user?.data?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setBio(user.bio);
      setName(user.name);
      setProfession(user?.profession);
      // setContactInfo(user?.contactInfo)
    }
    user?.contactInfo.forEach((contact) => {
      if (contact.contactName === contacts.FACEBOOK)
        setFacebookLink(contact.link);
      else if (contact.contactName === contacts.INSTAGRAM)
        setInstaLink(contact.link);
      else if (contact.contactName === contacts.TWITTER)
        setTwitterLink(contact.link);
      else if (contact.contactName === contacts.YOUTUBE)
        setYoutubeLink(contact.link);
    });
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const _contactInfo = [];
    _contactInfo.push({ contactName: contacts.FACEBOOK, link: facebookLink });
    _contactInfo.push({ contactName: contacts.YOUTUBE, link: youtubeLink });
    _contactInfo.push({ contactName: contacts.INSTAGRAM, link: instaLink });
    _contactInfo.push({ contactName: contacts.TWITTER, link: twitterLink });

    const res = await dispatch(
      completeProfile({ bio, name, contactInfo: _contactInfo, profession })
    );

    setIsLoading(false);
    if (res.payload.success) {
      toast.success("Completed the profile");
      navigate("/");
    } else toast.error(res.payload.message);
  };
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10">
        <Header />
        {status === STATUSES.LOADING || isLoading ? (
          <Loader />
        ) : (
          <form
            className="flex flex-col items-center space-y-5  justify-center mt-5 "
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-semibold dark:text-white text-[#181A2A]">
              Complete Profile
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
              placeholder="Enter bio"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
            />

            <DropDownInput
              data={WRITER_PROFESSIONS}
              setProfession={setProfession}
              defaultVal={profession}
            />
            <div
              className="flex w-full items-center  dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] space-x-5"
            >
              <FaFacebook
                size={20}
                className="text-[#3B3C4A] dark:text-[#FFFFFF]"
              />
              <input
                className="w-full outline-none  dark:bg-[#181A2A] "
                placeholder="Facebook"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
              />
            </div>
            <div
              className="flex w-full items-center  dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] space-x-5"
            >
              <FaTwitter
                size={20}
                className="text-[#3B3C4A] dark:text-[#FFFFFF]"
              />
              <input
                className="w-full outline-none  dark:bg-[#181A2A] "
                placeholder="Twitter"
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
              />
            </div>
            <div
              className="flex w-full items-center  dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] space-x-5"
            >
              <BsInstagram
                size={20}
                className="text-[#3B3C4A] dark:text-[#FFFFFF]"
              />
              <input
                className="w-full outline-none  dark:bg-[#181A2A] "
                placeholder="Instagram"
                value={instaLink}
                onChange={(e) => setInstaLink(e.target.value)}
              />
            </div>
            <div
              className="flex w-full items-center  dark:bg-[#181A2A] dark:text-white text-lg  outline-none dark:border-[#242535] border-2 px-5 py-2
                    border-[#E8E8EA] space-x-5"
            >
              <FaYoutube
                size={20}
                className="text-[#3B3C4A] dark:text-[#FFFFFF]"
              />
              <input
                className="w-full outline-none  dark:bg-[#181A2A] "
                placeholder="Youtube"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </div>
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

export default CompleteProfile;
