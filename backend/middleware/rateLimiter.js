const rateLimit = require("express-rate-limit")
const { RedisStore } = require("rate-limit-redis")
const {redisClient} = require("../config/redis")

let globalLimiter = null;
const globalRateLimiter = (req, res, next) => {
  if (!globalLimiter) {
    globalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: "global_limit:",
      }),
      message: {
        success: false,
        message: `Too many requests. Try again later ${req?.ip || "N/a"}`,
      }
    });
  }
  return globalLimiter(req, res, next);
}

let authLimit = null;
const authLimiter = (req, res, next) => {
 
  if (!authLimit) {
    authLimit = rateLimit({
      windowMs: 60 * 1000,
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: "auth_limit:",
      }),
      message: {
        success: false,
        message: `Too many authentication attempts ${req?.ip || "N/a"}`,
      },
    });
  }
  return authLimit(req, res, next);
};

module.exports={
    authLimiter,
    globalRateLimiter
}