import { app } from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(
    ` Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
  );
});

server.on("error", (err) => {
  logger.error("Failed to start server", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});
