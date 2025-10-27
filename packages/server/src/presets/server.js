import express from 'express';
import { imports } from '@leafage/toolkit';

export const serverPreset = async (ctx) => {
  const router = express.Router();

  ctx.app.use(router);

  const importServer = async () => {
    try {
      const { Component } = await imports.importServerModule('server', ctx.options);

      Component?.({
        router,
        context: ctx.context,
        options: ctx.options,
        renderer: ctx.renderer,
        isDev: ctx.isDev,
      });
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
