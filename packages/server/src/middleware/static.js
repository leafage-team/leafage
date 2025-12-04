import { utils } from '@leafage/toolkit';

export const staticMiddleware = (ctx) => {
  const staticList = utils.toArray(ctx.config.server.static).filter(Boolean);

  if (!ctx.isDev && !/^https?:\/\//.test(ctx.config.output.assetPrefix)) {
    staticList.push({
      route: ctx.config.output.assetPrefix,
      handle: ctx.config.output.client,
    });
  }

  staticList.forEach((row) => ctx.useMiddleware(ctx, row));
};
