import mergeFn from 'lodash/merge';

export const mergeProps = (...args) => mergeFn({}, ...args);
export const toArray = (value) => (Array.isArray(value) ? value : [value]).filter(Boolean);
