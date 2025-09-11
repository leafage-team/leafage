import { bundle } from '@leafage/rspack';
import { createContext } from '../common/utils';

export const build = async (options = {}) => {
  const context = createContext(options);

  await bundle(context);
};
