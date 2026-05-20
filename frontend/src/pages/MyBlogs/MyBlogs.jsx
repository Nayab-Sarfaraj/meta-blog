import { useEffect } from 'react'
import { TiSocialTwitter, TiSocialYoutube, TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../../Component/Footer'
import Header from '../../Component/Header'
import Loader from '../../Component/Loader'
import PostCard from '../../Component/PostCard'
import Avatar from '../../Component/Avatar'
import { fetchMyBlogs } from '../../Store/Slice/MyBlogs'
import { STATUSES } from '../../Store/Slice/AllBlogsSlice'

const MyBlogs = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.myBlogs.data.myBlogs)
    const myBlogsStatus = useSelector(state => state.myBlogs.status)
    const author = useSelector(state => state.user.data?.user)
    const userStatus = useSelector(state => state.user.status)

    useEffect(() => {
        dispatch(fetchMyBlogs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Icons = [{ icon: TiSocialFacebook }, { icon: TiSocialInstagram }, { icon: TiSocialTwitter }, { icon: TiSocialYoutube }]

    const isLoading = myBlogsStatus === STATUSES.LOADING
        || myBlogsStatus === 'idle'
        || userStatus === STATUSES.LOADING
        || !author

    return (
        <>
            <div className='min-h-screen bg-[#FFFFFF] dark:bg-[#181A2A] md:px-16 px-5'>
                <Header />
                {isLoading ? <Loader /> : (
                    <div className='mt-5'>
                        {/* Author profile card */}
                        <div className='dark:bg-[#242535] bg-[#F6F6F7] w-full flex flex-col items-center justify-center md:p-16 p-7 rounded-xl space-y-5'>
                            <div className='flex items-center space-x-3'>
                                <Avatar
                                    src={author?.avatar}
                                    name={author?.name}
                                    size="h-14 w-14"
                                />
                                <div>
                                    <div className='dark:text-white text-xl capitalize'>{author?.name}</div>
                                    <div className='text-[#BABABF] text-sm capitalize'>{author?.profession}</div>
                                </div>
                            </div>
                            {author?.bio && (
                                <div className='text-[#BABABF] md:w-[70%] w-full text-center'>{author.bio}</div>
                            )}
                            {author?.contactInfo?.length > 0 && (
                                <div className='text-white flex space-x-3'>
                                    {author.contactInfo.map((contact, idx) => {
                                        const IconComponent = Icons[idx]?.icon
                                        if (!IconComponent || !contact.link) return null
                                        return (
                                            <Link to={contact.link} key={idx}>
                                                <div className='bg-[#696A75] h-7 w-7 flex items-center justify-center rounded-lg'>
                                                    <IconComponent />
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Blog grid */}
                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-4 items-stretch'>
                            {blogs?.length > 0 ? (
                                blogs.map((blog) => <PostCard blog={blog} key={blog._id} />)
                            ) : (
                                <div className='col-span-3 flex flex-col items-center justify-center py-16 space-y-4'>
                                    <div className='text-[#E8E8EA] dark:text-[#242535]'>
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 20h9" />
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                        </svg>
                                    </div>
                                    <p className='text-[#3B3C4A] dark:text-white text-xl font-medium'>No posts yet</p>
                                    <p className='text-[#696A75] dark:text-[#97989F] text-sm'>You haven't written anything yet.</p>
                                    <Link to='/create' className='bg-[#4B6BFB] text-white px-6 py-2 rounded-lg text-sm'>
                                        Write your first post
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default MyBlogs
