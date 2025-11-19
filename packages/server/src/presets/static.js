import serveStatic from 'serve-static';
import { useMiddleware } from '@/common/utils';

export const staticPreset = (ctx) => {
  if (!ctx.context.config.dev && !/^https?:\/\//.test(ctx.context.config.output.assetPrefix)) {
    useMiddleware(
      ctx,
      {
        route: ctx.context.config.output.assetPrefix,
        handle: serveStatic(ctx.context.config.output.client),
      },
    );
  }
};
