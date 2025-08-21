import { imports, utils } from '@leafage/toolkit';

export const serverPreset = async (ctx) => {
  const importServer = async () => {
    try {
      const { Component } = await imports.importServerModule('server', ctx.options);

      utils.applyPresets(ctx, [Component]);
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
