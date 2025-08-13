import path from 'path';
import { imports } from '@leafage/toolkit';

export const importPreset = (ctx) => {
  ctx.import = async (name) => {
    const component = await imports.importModule(
      `./${name}`,
      {
        paths: [path.join(ctx.options.dir.root, ctx.options.dir.dist, ctx.options.dir.server)],
      },
    );

    return {
      loader: component?.loader,
      Component: component?.default ?? component,
    };
  };
};
