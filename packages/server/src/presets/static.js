import serveStatic from 'serve-static';
import { utils } from '@leafage/toolkit';
import { useMiddleware } from '@/common/utils';

export const staticPreset = (ctx) => {
  const staticList = utils.toArray(ctx.config.server.static).filter(Boolean);

  if (!ctx.config.dev && !/^https?:\/\//.test(ctx.config.output.assetPrefix)) {
    staticList.push(
      {
        route: ctx.config.output.assetPrefix,
        handle: serveStatic(ctx.config.output.client),
      },
    );
  }

  staticList.forEach((row) => useMiddleware(ctx, row));
};
