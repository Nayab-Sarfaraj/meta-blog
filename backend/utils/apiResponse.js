const {StatusCodes} = require("http-status-codes");
const SuccessResponse = (res , options)=>{
    const {
    message="",
    success=true,
    statusCode=StatusCodes.OK,
    data=null,
    error=null
    } = options;

    return res.status(statusCode).json({
        message,
        success,
        statusCode,
        data,
        error
    })

}

const ErrorResponse = (res,options)=>{
     const {
    message="Something went wrong",
    success=false,
    statusCode=StatusCodes.INTERNAL_SERVER_ERROR,
    data=null,
    error=null
    } = options;

    return res.status(statusCode).json({
        message,
        success,
        statusCode,
        data,
        error
    })

}

module.exports = {SuccessResponse,ErrorResponse}