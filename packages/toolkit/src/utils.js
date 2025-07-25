import mergeFn from 'lodash/merge';

export const mergeProps = (...args) => mergeFn({}, ...args);
