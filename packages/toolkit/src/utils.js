import mergeFn from 'lodash/merge';
import pify from 'pify';

export const mergeProps = (...args) => mergeFn({}, ...args);
export const toArray = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);
export const applyPresets = (ctx, presets = []) => {
  if (!presets?.length) return ctx;

  const [preset, ...rest] = presets;

  preset?.(ctx);

  return applyPresets(ctx, rest);
};
export const emptyFn = () => {
};
// @doc https://www.npmjs.com/package/pify
export const promisify = (input, ...args) => {
  const pifyFn = pify?.default ?? pify;

  return pifyFn.apply(pifyFn, [input ?? emptyFn].concat(args));
};
