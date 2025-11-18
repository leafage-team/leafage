const { loadConfig, logger, createLeafage } = require('leafage');

const run = async () => {
  const config = await loadConfig();

  const leafage = await createLeafage({ config });

  await leafage.build();
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
