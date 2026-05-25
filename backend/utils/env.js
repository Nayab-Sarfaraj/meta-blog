const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const envSchema = require("../validator/env.schema");
const { logger } = require("./logger");

const getEnv = () => {
    const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error({ errors: parsed.error.format() }, "Invalid environment variables");
  process.exit(1);
}

return parsed.data;
    
}

module.exports=getEnv