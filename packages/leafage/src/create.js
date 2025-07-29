import path from 'path';
import { createHooks } from 'hookable';
import { imports, runWithContext } from '@leafage/toolkit';
import { importModule } from '@leafage/toolkit/src/imports';

export const createContext = (options) => {
  const hooks = createHooks();
  // eslint-disable-next-line no-use-before-define
  const callHook = (...args) => runWithContext(context, () => hooks.callHook(...args));

  const context = {
    version: process.env.PACKAGE_VERSION,
    options,
    hooks: {
      hook: hooks.hook,
      callHook,
    },
    resolveModule: (id) => imports.resolveModule(id, {
      paths: [
        import.meta.url,
        options.dir.root,
        path.join(options.dir.root, 'node_modules'),
      ],
    }),
    importModule: (id) => importModule(id, {
      paths: [
        import.meta.url,
        options.dir.root,
        path.join(options.dir.root, 'node_modules'),
      ],
    }),
    close: () => callHook('close', context),
    runWithContext: (fn) => runWithContext(context, fn),
  };

  return context;
};
