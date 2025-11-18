const { loadConfig, logger, createLeafage, useRender } = require('leafage');

const run = async () => {
  const config = await loadConfig();

  const leafage = await createLeafage({ config });

  await leafage.build();

  leafage.server.use('/', async (req, res) => {
    const render = useRender();
    const html = await render('home/index');

    res.end(html);
  });

  leafage.server.listen(3000, () => {
    logger.info('Server is running on port 3000');
  });
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
