const ErrorHandler = require("../utils/errorhandler")
const fs = require("fs")
const { logger } = require("../utils/logger");

module.exports = (schema) =>(req,res,next)=>{
    const result = schema.safeParse({...req.body,file:req.file})

    if(!result?.success){

        if (req.file) {
            fs.unlinkSync(req.file.path); 
        }

       logger.warn({ path: req.path, errors: result.error.errors }, "Zod validation failed");
       return next(new ErrorHandler(result.error.issues[0].message,400))
    }
    next()
}