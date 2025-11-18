import { createRenderer } from '@leafage/renderer';

export const rendererPreset = (ctx) => {
  const { findResource, render } = createRenderer(ctx);

  ctx.findResource = findResource;
  ctx.render = render;
};
