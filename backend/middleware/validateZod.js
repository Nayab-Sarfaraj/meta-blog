const ErrorHandler = require("../utils/errorhandler")
const fs = require("fs")

module.exports = (schema) =>(req,res,next)=>{
    const result = schema.safeParse({...req.body,file:req.file})
    console.log(req)
    if(!result?.success){

        if (req.file) {
            fs.unlinkSync(req.file.path); 
        }

       return next(new ErrorHandler(result.error.issues[0].message,400))
    }
    next()
}