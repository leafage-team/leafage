import path from 'path';
import { createHooks } from 'hookable';
import { imports, runWithContext } from '@leafage/toolkit';

export const createContext = (options) => {
  const hooks = createHooks();
  // eslint-disable-next-line no-use-before-define
  const callHook = (...args) => runWithContext(context, () => hooks.callHook(...args));
  const resolvePaths = [
    import.meta.url,
    path.join(options.dir.root, options.dir.src),
    options.dir.root,
    path.join(options.dir.root, 'node_modules'),
  ];

  const context = {
    version: process.env.PACKAGE_VERSION,
    options,
    hook: hooks.hook,
    callHook,
    resolveModule: (id) => imports.resolveModule(id, {
      paths: resolvePaths,
    }),
    importModule: (id) => imports.importModule(id, {
      paths: resolvePaths,
    }),
    close: () => callHook('close', context),
    runWithContext: (fn) => runWithContext(context, fn),
  };

  return context;
};
