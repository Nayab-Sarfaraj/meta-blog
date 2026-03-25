const BlogRepository = require("../repository/blog.repository");
const uploadOnCloudinary  = require("../utils/cloudinary")
class BlogService{
    constructor(blogRepository){
    this.blogRepository = blogRepository
    }

    async createBlog(data){
        const coverImage = await uploadOnCloudinary (data.filePath);
        const blog = await this.blogRepository.createBlog({...data,coverImage:coverImage.url})
        return blog
    }

}

module.exports = new BlogService(BlogRepository)