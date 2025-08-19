import { getConfig } from '@leafage/toolkit';
import { bundle } from '@leafage/rspack';
import { createContext } from '../common/utils';

export const build = async (options = {}) => {
  const opt = getConfig(options);
  const context = createContext(opt);

  await bundle(context);
};
