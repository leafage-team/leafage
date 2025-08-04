import path from 'path';
import { utils } from '@leafage/toolkit';
import { useMiddleware } from '@/common/utils';

export const staticPreset = (app, context) => {
  const staticList = utils.toArray(context.options.server.static).filter(Boolean);

  if (!context.options.dev && !/^https?:\/\//.test(context.options.builder.publicPath)) {
    staticList.push({
      path: `${context.options.builder.publicPath}${context.options.dir.static}`,
      handle: path.join(context.options.dir.root, context.options.dir.dist, context.options.dir.static),
    });
  }

  staticList.forEach((row) => useMiddleware(app, row));
};
