import mergeFn from 'lodash/merge';

export const mergeProps = (...args) => mergeFn({}, ...args);
export const toArray = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);
export const applyPresets = (ctx, presets = []) => {
  if (!presets?.length) return ctx;

  const [preset, ...rest] = presets;

  preset?.(ctx);

  return applyPresets(ctx, rest);
};
