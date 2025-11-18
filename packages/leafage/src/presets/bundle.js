import { createBundle } from '@leafage/rspack';

export const bundlePreset = (ctx) => {
  const { build } = createBundle(ctx);

  ctx.build = build;
};
