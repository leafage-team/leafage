import serverRouter from 'router';
import { imports } from '@leafage/toolkit';

export const serverPreset = async (ctx) => {
  const router = serverRouter();

  ctx.app.use(router);

  const importServer = async () => {
    try {
      const server = await imports.importServerModule(
        'server',
        {
          url: ctx.config.output.server,
          try: true,
        },
      );

      ctx.getServer = () => server?.({
        router,
        context: ctx.context,
        config: ctx.config,
        renderer: ctx.renderer,
        isDev: ctx.isDev,
      }) || {};
    } catch (e) {
      /* empty */
    }
  };

  if (ctx.isDev) {
    ctx.context.hook('bundle:compiled', async ({ name }) => {
      if (name === 'server') {
        await importServer();
      }
    });

    return;
  }

  await importServer();
};
