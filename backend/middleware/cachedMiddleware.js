const { redisClient } = require("../config/redis");
const { SuccessResponse } = require("../utils/apiResponse");
const { logger } = require("../utils/logger");

const cacheMiddleware= async(req,res,next)=>{
    try {
        console.log("RUNNING")
        const page = req.query.page || 1;
        const key = `blogs:page:${page}`;
        const cachedData = await redisClient.get(key);
        if(cachedData){
            logger.info({key},"CACHE HITTTT")
           return res.json({ success: true, blogs:JSON.parse(cachedData),source:"cache"})
        }
        req.cacheKey=key;
        logger.info("CACHE MISSED")
        next()
    } catch (error) {
        next()
    }
}
module.exports={cacheMiddleware}