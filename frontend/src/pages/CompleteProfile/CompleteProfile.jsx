import React, { useEffect, useState } from "react";
import Header from "../../Component/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../Component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../Store/Slice/AllBlogsSlice";
import Loader from "../../Component/Loader";
import { FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BiLoader } from "react-icons/bi";
import DropDownInput from "../../Component/DropDownInput";
import { WRITER_PROFESSIONS, contacts } from "../../constants/constant";
import { completeProfile } from "../../Store/Slice/UserAuthentication";
import toast from "react-hot-toast";

const CompleteProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
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
      user?.contactInfo.forEach((contact) => {
        if (contact.contactName === contacts.FACEBOOK) setFacebookLink(contact.link);
        else if (contact.contactName === contacts.INSTAGRAM) setInstaLink(contact.link);
        else if (contact.contactName === contacts.TWITTER) setTwitterLink(contact.link);
        else if (contact.contactName === contacts.YOUTUBE) setYoutubeLink(contact.link);
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const _contactInfo = [
      { contactName: contacts.FACEBOOK, link: facebookLink },
      { contactName: contacts.YOUTUBE, link: youtubeLink },
      { contactName: contacts.INSTAGRAM, link: instaLink },
      { contactName: contacts.TWITTER, link: twitterLink },
    ];
    const res = await dispatch(completeProfile({ bio, name, contactInfo: _contactInfo, profession }));
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
            className="flex flex-col space-y-4 mt-5 mx-auto w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-semibold dark:text-white text-[#181A2A]">Complete Profile</h1>

            <input
              placeholder="Enter name"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <input
              placeholder="Enter bio"
              className="w-full dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
            />
            <DropDownInput
              data={WRITER_PROFESSIONS}
              setProfession={setProfession}
              defaultVal={profession}
            />

            {/* Social links — grouped with a small heading */}
            <div className="pt-2">
              <p className="text-[#696A75] dark:text-[#97989F] text-sm mb-3">Social links</p>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg space-x-4">
                  <FaFacebook size={20} className="text-[#3B3C4A] dark:text-[#FFFFFF] shrink-0" />
                  <input
                    className="w-full outline-none dark:bg-[#181A2A] dark:text-white"
                    placeholder="Facebook"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                  />
                </div>
                <div className="flex items-center dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg space-x-4">
                  <FaTwitter size={20} className="text-[#3B3C4A] dark:text-[#FFFFFF] shrink-0" />
                  <input
                    className="w-full outline-none dark:bg-[#181A2A] dark:text-white"
                    placeholder="Twitter"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                  />
                </div>
                <div className="flex items-center dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg space-x-4">
                  <BsInstagram size={20} className="text-[#3B3C4A] dark:text-[#FFFFFF] shrink-0" />
                  <input
                    className="w-full outline-none dark:bg-[#181A2A] dark:text-white"
                    placeholder="Instagram"
                    value={instaLink}
                    onChange={(e) => setInstaLink(e.target.value)}
                  />
                </div>
                <div className="flex items-center dark:bg-[#181A2A] dark:text-white text-lg outline-none dark:border-[#242535] border-2 px-5 py-3 border-[#E8E8EA] rounded-lg space-x-4">
                  <FaYoutube size={20} className="text-[#3B3C4A] dark:text-[#FFFFFF] shrink-0" />
                  <input
                    className="w-full outline-none dark:bg-[#181A2A] dark:text-white"
                    placeholder="Youtube"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

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

export default CompleteProfile;
