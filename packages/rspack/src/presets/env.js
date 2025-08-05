import { rspack } from '@rspack/core';

export const envPreset = (ctx) => {
  const vars = {
    'process.env.NODE_ENV': JSON.stringify(ctx.config.mode),
    'process.dev': ctx.isDev,
    'process.browser': ctx.isClient,
    'process.client': ctx.isClient,
    'process.server': ctx.isServer,
  };
  const prefix = 'process.env.';

  Object.entries(ctx.options.env).forEach(([key, value]) => {
    const envKey = prefix + key.replace(new RegExp(`^${prefix}`), '');
    vars[envKey] = ['boolean', 'number'].includes(typeof value) ? value : JSON.stringify(value);
  });

  ctx.config.plugins.push(
    new rspack.DefinePlugin(vars),
  );
};
