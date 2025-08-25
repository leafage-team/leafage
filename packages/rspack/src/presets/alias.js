import path from 'pathe';

export const aliasPreset = (ctx) => {
  ctx.config.resolve.alias = {
    '@': path.join(ctx.options.dir.root, ctx.options.dir.src),
  };
};
