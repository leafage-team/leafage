const { loadConfig, logger, dev } = require('leafage');

const run = async () => {
  const options = await loadConfig();

  await dev(options);
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
