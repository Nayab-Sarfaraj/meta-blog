const pino = require("pino");

const isProduction = process.env.NODE_ENV === "production";
const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    transport:!isProduction ? {
      target:"pino-pretty",
      options:{
        colorize:true,
        ignore: "pid,hostname",
        levelFirst:true,
        translateTime: "SYS:standard",
      },

    }: undefined
  }
);

module.exports = { logger };