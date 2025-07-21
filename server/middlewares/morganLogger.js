// middlewares/morganLogger.js

import morgan from "morgan";
import logger from "../utils/logger.js";

// 'dev' = concise colored output (dev only)
// 'combined' = detailed Apache-style log (prod)
const format = process.env.NODE_ENV === "production" ? "combined" : "dev";

const morganMiddleware = morgan(format, {
  stream: {
    write: (message) => {
      logger.http(message.trim()); // Logs to application-%DATE%.log under 'http' level
    },
  },
});

export default morganMiddleware;
