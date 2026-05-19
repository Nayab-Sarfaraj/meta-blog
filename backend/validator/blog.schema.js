const z = require("zod")

const createBlogSchema = z.object({
    description:z.string().min(10,"Description must be 10 character long"),
    title:z.string().min(5,"Title must be 5 character long"),
    category:z.enum(["Technology","lifestyle","travel","buisness","economy","sports"]),
    file:z.any().refine((file)=>file&& file.path,"Cover Image is required")
    
})

module.exports = createBlogSchema