const {createClient} = require("redis");
const { logger } = require("../utils/logger");
const env = require("../utils/env")();



const redisClient = createClient({
    url: env.REDIS_URL,
});


const connectToRedis=async()=>{
    try {
        await redisClient.connect();
        logger.info("Successfully connected to redis");
    } catch (error) {
        logger.error({err:error},"Something went wrong while connecting to redis")
        throw error
    }
}


module.exports={
    connectToRedis,
    redisClient
}