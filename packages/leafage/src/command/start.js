import { getConfig } from '@leafage/toolkit';
import { createServer } from '@leafage/server';
import { createContext } from '../common/utils';

export const start = async (options = {}) => {
  const opt = getConfig(options);
  const context = createContext(opt);
  const server = createServer(context);

  server.start();
};
