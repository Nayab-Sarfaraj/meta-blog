const pinoHttp = require("pino-http");
const { logger } = require("../utils/logger");

const httpLogger = pinoHttp({
    logger,
    
    // 1. Keep the human-readable summary messages!
    customSuccessMessage: (req, res) => `${req.method} ${req.url} completed with ${res.statusCode}`,
    customErrorMessage: (req, res) => `${req.method} ${req.url} failed with ${res.statusCode}`,
    
    // 2. Hide the giant req/res objects
    serializers: {
        req: () => undefined,
        res: () => undefined
    },
    
    // 3. Keep the structured data for easy searching later
    customProps: (req, res) => {
        return {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
        };
    },
});

module.exports={httpLogger}