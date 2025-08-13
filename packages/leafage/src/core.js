import { createHooks } from 'hookable';
import { runWithContext } from '@leafage/toolkit';

export const createContext = (options) => {
  const hooks = createHooks();
  // eslint-disable-next-line no-use-before-define
  const callHook = (...args) => runWithContext(context, () => hooks.callHook(...args));

  const context = {
    version: process.env.PACKAGE_VERSION,
    options,
    hook: hooks.hook,
    callHook,
    close: () => callHook('close', context),
    runWithContext: (fn) => runWithContext(context, fn),
  };

  return context;
};
