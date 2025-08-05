const { createContext, loadConfig, createServer } = require('leafage');
const { logger } = require('@leafage/toolkit');
const { bundle } = require('@leafage/rspack');

const start = async () => {
  const options = await loadConfig();
  const context = createContext(options);

  await bundle(context);

  createServer(context).start();
};

start().catch((error) => {
  logger.error(error);
  process.exit(1);
});
