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

  leafage.server.use(async (err, req, res, next) => {
    const render = useRender();
    const html = await render('Error', { message: err.message, statusCode: err.statusCode });

    res.end(html);
    next();
  });

  const { host, port } = leafage.config.server;
  await leafage.server.listen(port, host);

  logger.info(`Server is running on http://${host}:${port}`);
};

run().catch((error) => {
  logger.error(error);
  process.exit(1);
});
