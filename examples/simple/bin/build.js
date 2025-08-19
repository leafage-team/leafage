const { loadConfig, logger, build } = require('leafage');

const run = async () => {
  const options = await loadConfig();

  await build(options);
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
