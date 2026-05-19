import React from 'react'
import Footer from '../../Component/Footer'
import Header from '../../Component/Header'
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slice/UserAuthentication';
import { STATUSES } from '../../Store/Slice/AllBlogsSlice';
import Loader from '../../Component/Loader';
import Avatar from '../../Component/Avatar';

const Setting = () => {
    const status = useSelector(state => state.user.status)
    const user = useSelector(state => state.user.data?.user)
    const dispatch = useDispatch()

    return (
        <>
            <div className='bg-[#FFFFFF] dark:bg-[#181A2A] min-h-screen w-full md:px-16 px-5 pb-10'>
                <Header />
                {status === STATUSES.LOADING ? <Loader /> : (
                    <div className='flex flex-col items-center space-y-3'>

                        {/* User info */}
                        <div className='flex items-center space-x-3 md:w-96 w-72 pb-2 mb-1 border-b border-[#E8E8EA] dark:border-[#242535]'>
                            <Avatar src={user?.avatar} name={user?.name} size="h-12 w-12" />
                            <div>
                                <div className='text-[#181A2A] dark:text-white font-medium capitalize'>{user?.name}</div>
                                <div className='text-[#97989F] text-sm capitalize'>{user?.profession || user?.email}</div>
                            </div>
                        </div>

                        <Link to={"/uploadProfilePic"}>
                            <div className='flex items-center border-2 md:w-96 w-72 dark:border-[#242535] border-[#E8E8EA] rounded-lg justify-between px-3 py-3 hover:border-[#4B6BFB] dark:hover:border-[#4B6BFB] transition'>
                                <div className='text-[#3B3C4A] dark:text-white text-lg'>Update profile picture</div>
                                <MdArrowForwardIos size={20} className='text-[#97989F]' />
                            </div>
                        </Link>
                        <Link to={"/completeProfile"}>
                            <div className='flex items-center border-2 md:w-96 w-72 dark:border-[#242535] border-[#E8E8EA] rounded-lg justify-between px-3 py-3 hover:border-[#4B6BFB] dark:hover:border-[#4B6BFB] transition'>
                                <div className='text-[#3B3C4A] dark:text-white text-lg'>Complete Profile</div>
                                <MdArrowForwardIos size={20} className='text-[#97989F]' />
                            </div>
                        </Link>
                        <Link to={"/update/password"}>
                            <div className='flex items-center border-2 md:w-96 w-72 dark:border-[#242535] border-[#E8E8EA] rounded-lg justify-between px-3 py-3 hover:border-[#4B6BFB] dark:hover:border-[#4B6BFB] transition'>
                                <div className='text-[#3B3C4A] dark:text-white text-lg'>Update Password</div>
                                <MdArrowForwardIos size={20} className='text-[#97989F]' />
                            </div>
                        </Link>

                        <div className='pt-3'>
                            <button
                                className='text-white text-lg bg-rose-500 px-8 py-2 rounded-lg'
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Setting
