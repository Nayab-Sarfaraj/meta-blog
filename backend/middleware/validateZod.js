const ErrorHandler = require("../utils/errorhandler")

module.exports = (schema) =>(req,res,next)=>{
    const result = schema.safeParse(req.body)
    if(!result?.success){
       return next(new ErrorHandler(result.error.issues[0].message,400))
    }
    next()
}