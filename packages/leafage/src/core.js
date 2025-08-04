import path from 'path';
import { createHooks } from 'hookable';
import { imports, runWithContext } from '@leafage/toolkit';

export const createContext = (options) => {
  const hooks = createHooks();
  // eslint-disable-next-line no-use-before-define
  const callHook = (...args) => runWithContext(context, () => hooks.callHook(...args));

  const context = {
    version: process.env.PACKAGE_VERSION,
    options,
    hook: hooks.hook,
    callHook,
    resolveModule: (id) => imports.resolveModule(id, {
      paths: [
        import.meta.url,
        options.dir.root,
        path.join(options.dir.root, 'node_modules'),
      ],
    }),
    importModule: (id) => imports.importModule(id, {
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
