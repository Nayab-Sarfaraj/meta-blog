const dotenv = require("dotenv")
const z = require("zod")

const envSchema=z.object({
    PORT:z.coerce.number().default(5000),
    SECRET_KEY:z.string(),
    send_Email_User:z.email(),
    send_Email_Password:z.string(),
    MONGO_USERNAME:z.string(),
    MONGO_PASSWORD:z.string(),
    NODE_ENV: z.enum([
    "development",
    "production",
    "test",
  ]).default("development"),

  LOG_LEVEL: z.enum([
    "trace",
    "debug",
    "info",
    "warn",
    "error",
  ]).default("info"),
    
})

module.exports=envSchema