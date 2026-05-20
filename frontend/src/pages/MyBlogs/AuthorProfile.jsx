import { useEffect } from 'react'
import { TiSocialFacebook, TiSocialInstagram, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../Component/Footer'
import Header from '../../Component/Header'
import Loader from "../../Component/Loader"
import PostCard from '../../Component/PostCard'
import Avatar from '../../Component/Avatar'
import { fetchAuthorBlogAndCredentials } from '../../Store/Slice/FetchAuthorBlogsAndCredentials'

const AuthorProfile = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const blogs = useSelector(state => state.author.data.blogs)
  const author = useSelector(state => state.author.data.author)
  const status = useSelector(state => state.author.status)

  const Icons = [{ icon: TiSocialFacebook }, { icon: TiSocialInstagram }, { icon: TiSocialTwitter }, { icon: TiSocialYoutube }]

  useEffect(() => {
    dispatch(fetchAuthorBlogAndCredentials(params.id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const isLoading = status === 'loading' || status === 'idle' || !author

  return (
    <>
      <div className='min-h-screen bg-[#FFFFFF] dark:bg-[#181A2A] md:px-16 px-5'>
        <Header />
        {isLoading ? <Loader /> : (
          <div className='mt-5'>
            {/* Author card */}
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
              {blogs?.map((blog) => <PostCard blog={blog} key={blog._id} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default AuthorProfile
