import { createHooks } from 'hookable';
import { runWithContext, useContext, loadConfig } from '@leafage/toolkit';

const dev = () => {
  const context = useContext();

  console.log('xxxx', context.version);
};

const initFn = async (context) => {
  if (context.options.dev) {
    dev();
  }
};

export const createContext = async () => {
  const options = await loadConfig();
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
    ready: () => runWithContext(context, () => initFn(context)),
    close: () => callHook('close', context),
  };

  return context;
};
