import { createServer } from '@leafage/server';
import { createContext } from '../common/utils';

export const start = async (options = {}) => {
  const context = createContext(options);
  const server = createServer(context);

  server.start();
};
