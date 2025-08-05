const { createContext, loadConfig, createServer, logger, build } = require('leafage');

const start = async () => {
  const options = await loadConfig();
  const context = createContext(options);
  const server = createServer(context);

  await build(context);

  server.start();
};

start().catch((error) => {
  logger.error(error);
  process.exit(1);
});
