const pinoHttp = require("pino-http");
const { logger } = require("../utils/logger");

const httpLogger = pinoHttp({
    logger,
    customSuccessMessage:(req,res)=>`${req.method} ${req.url} completed with ${res.statusCode}`,
    customErrorMessage:(req,res)=> `${req.method} ${req.url} failed with ${res.statusCode}`,
    serializers: {
        req: () => undefined,
        res: () => undefined
    }
});

module.exports = { httpLogger };