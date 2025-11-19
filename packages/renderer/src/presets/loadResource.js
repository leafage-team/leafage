import fs from 'node:fs';

export const loadResourcePreset = (ctx) => {
  const loadResourceHandle = (mfs) => {
    let resources = [];

    try {
      const fullPath = ctx.config.output.manifest;

      if (mfs.existsSync(fullPath)) {
        const contents = mfs.readFileSync(fullPath, 'utf-8');

        resources = JSON.parse(contents) || [];
      }
    } catch (err) {
      resources = [];
    }

    return resources;
  };

  if (ctx.isDev) {
    ctx.context.hook('bundle:resource', (mfs) => {
      ctx.resources = loadResourceHandle(mfs);
    });
    return;
  }

  ctx.resources = loadResourceHandle(fs);
};
