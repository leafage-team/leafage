const { loadConfig, logger, start } = require('leafage');

const run = async () => {
  const options = await loadConfig();

  await start(options);
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
