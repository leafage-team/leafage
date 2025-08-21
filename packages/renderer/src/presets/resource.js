import path from 'path';
import fs from 'fs';
import { match as createRegexpMatch } from 'path-to-regexp';
import { utils } from '@leafage/toolkit';

const loadResourcePreset = (ctx) => {
  const loadResourceHandle = (mfs) => {
    let resources = [];

    try {
      const fullPath = path.join(ctx.options.dir.root, ctx.options.dir.dist, ctx.options.dir.manifest);

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
    ctx.context.hook('bundle:resources', (mfs) => {
      ctx.resources = loadResourceHandle(mfs);
    });
    return;
  }

  ctx.resources = loadResourceHandle(fs);
};
const findResourcePreset = (ctx) => {
  const map = new Map();

  ctx.findResource = (id) => {
    if (!id) return null;
    if (map.has(id)) return map.get(id);

    for (let i = 0, len = ctx.resources.length; i < len; i += 1) {
      const row = ctx.resources[i];
      // view find
      if (row.view === id) {
        map.set(id, row);

        return row;
      }
      // path find
      const match = createRegexpMatch(
        row.path,
        {
          decode: decodeURIComponent,
          strict: true,
          end: true,
          sensitive: false,
        },
      );
      const result = match(id);
      if (result) {
        const resource = utils.mergeProps(row, { params: result.params || {} });
        map.set(id, resource);

        return resource;
      }
    }

    return null;
  };
};

export const resourcePreset = (ctx) => {
  utils.applyPresets(
    ctx,
    [
      loadResourcePreset,
      findResourcePreset,
    ],
  );
};
