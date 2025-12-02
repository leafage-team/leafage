import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

export const runWithContext = (context, fn) => asyncLocalStorage.run(context, fn);
export const useContext = () => asyncLocalStorage.getStore();
