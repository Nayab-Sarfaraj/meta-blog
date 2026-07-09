const { redisClient } = require("../config/redis");
const { SuccessResponse } = require("../utils/apiResponse");
const { logger } = require("../utils/logger");

const cacheMiddleware= async(req,res,next)=>{
    try {
          
       if(req.originalUrl.includes("/blogs")&& req.originalUrl.includes("page")){
         const page = req.query.page || 1;
        const key = `blogs:page:${page}`;
        const cachedData = await redisClient.get(key);
         if(cachedData){
            logger.info({key},"CACHE HITTTT")
           return res.json({ success: true, blogs:JSON.parse(cachedData),source:"cache"})
        }
        req.cacheKey=key;
        logger.info("CACHE MISSED")
       }else if(req.originalUrl.includes("author")&& req.method==="GET"){
        const {id}=req.params;
        const key=`author:${id}`;
        const cachedData =await redisClient.hGetAll(key)
        
        if(cachedData && Object.keys(cachedData).length > 0){
            logger.info({key},"CACHE HITTTT")
          return res.json({
            success: true, 
            blogs: cachedData.blogs ? JSON.parse(cachedData.blogs) : [],
            author: cachedData.author ? JSON.parse(cachedData.author) : null
          })
        }
         req.cacheKey=key;
        logger.info("CACHE MISSED")
       }else if(req.originalUrl.includes("/blog")&& !req.originalUrl.includes("/blogs") && req.method==="GET"){
        const {id}=req.params;
        const key=`blog:${id}`;
        const cachedData =await redisClient.get(key)
        if(cachedData){
            logger.info({key},"CACHE HITTTT")
          return res.json({success: true, blog:JSON.parse(cachedData)})
        }
         req.cacheKey=key;
        logger.info("CACHE MISSED")
       }else if(req.originalUrl.includes("myBlogs")){
        const key = `user:blogs:${req.user._id}`;
        const cachedData = await redisClient.get(key);
        if(cachedData){
          return res.json({success:true,myBlogs:JSON.parse(cachedData)})
        }
        req.cacheKey=key;
       }
        next()
    } catch (error) {
        next()
    }
}
module.exports={cacheMiddleware}