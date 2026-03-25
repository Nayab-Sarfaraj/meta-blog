const z = require("zod")

const createBlogSchema = z.object({
    description:z.string().min(10,"Description must be 10 character long"),
    title:z.string().min(5,"Title must be 5 character long"),
    category:z.enum(["Technology","Fashion","Food","Travel","Health","Entertainment","Sports","Education","Other"])
    
})

module.exports = createBlogSchema