const { createContext, loadConfig } = require('leafage');
const { logger } = require('@leafage/toolkit');
const { getWebpackConfig } = require('@leafage/webpack');

const start = async () => {
  const options = await loadConfig();
  const context = createContext(options);

  const configs = await getWebpackConfig(context);

  logger.log(configs);
};

start().catch((error) => {
  logger.error(error);
  process.exit(1);
});
