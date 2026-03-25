const z =require("zod")
 const registerSchema = z.object({
    email:z.email(),
    name:z.string().min(1,"Name is required"),
    password:z.string().min(6,"Password must be at least 6 characters long")
})

 const loginSchema = z.object({
     email:z.email("Invalid email format"),
    password:z.string().min(6,"Password must be at least 6 characters long")
})

module.exports = {registerSchema,loginSchema}