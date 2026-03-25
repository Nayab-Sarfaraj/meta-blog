const Blog = require("../model/blogModel");

class BlogRepository{
    constructor(blogModel){
        this.blogModel = blogModel
    }
    async createBlog(data){
    const newBlog = new this.blogModel({
      description:data.description,
      title:data.title,
      author: data.author,
      coverImage: data.coverImage,
      category:data.category,
    });

    const savedBlog = await newBlog.save();
    return savedBlog
    }
}

module.exports = new BlogRepository(Blog)