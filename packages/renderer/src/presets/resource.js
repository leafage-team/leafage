import path from 'path';
import fs from 'fs';

const loadResources = (mfs, options) => {
  let resources = [];

  try {
    const fullPath = path.join(options.dir.root, options.dir.dist, options.dir.manifest);

    if (mfs.existsSync(fullPath)) {
      const contents = mfs.readFileSync(fullPath, 'utf-8');

      resources = JSON.parse(contents) || [];
    }
  } catch (err) {
    resources = [];
  }

  return resources;
};

export const resourcePreset = (ctx) => {
  if (ctx.isDev) {
    ctx.context.hook('bundle:resources', (mfs) => {
      ctx.resources = loadResources(mfs, ctx.options);
    });
    return;
  }

  ctx.resources = loadResources(fs, ctx.options);
};
