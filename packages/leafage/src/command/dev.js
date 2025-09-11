import { createServer } from '@leafage/server';
import { bundle } from '@leafage/rspack';
import { createContext } from '../common/utils';

export const dev = async (options = {}) => {
  const context = createContext(options);
  const server = createServer(context);

  await bundle(context);

  server.start();
};
