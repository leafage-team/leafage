import path from 'path';
import { utils } from '@leafage/toolkit';
import { useMiddleware } from '../common/utils';

export const staticPreset = (ctx) => {
  const staticList = utils.toArray(ctx.context.options.server.static).filter(Boolean);

  if (!ctx.context.options.dev && !/^https?:\/\//.test(ctx.context.options.builder.publicPath)) {
    staticList.push({
      path: ctx.context.options.builder.publicPath,
      handle: path.join(ctx.context.options.dir.root, ctx.context.options.dir.dist, ctx.context.options.dir.client),
    });
  }

  staticList.forEach((row) => useMiddleware(ctx, row));
};
