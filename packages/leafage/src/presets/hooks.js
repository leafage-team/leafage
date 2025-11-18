import { createHooks } from 'hookable';

export const hooksPreset = (ctx) => {
  const hooks = createHooks();

  ctx.hook = hooks.hook;
  ctx.callHook = hooks.callHook;
};
