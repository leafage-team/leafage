import { getConfig } from '@leafage/toolkit';
import { createServer } from '@leafage/server';
import { bundle } from '@leafage/rspack';
import { createContext } from '../common/utils';

export const dev = async (options = {}) => {
  const opt = getConfig(options);
  const context = createContext(opt);
  const server = createServer(context);

  await bundle(context);

  server.start();
};
