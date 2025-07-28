import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

export const runWithContext = (context, fn) => asyncLocalStorage.run(context, fn);
export const useContext = () => asyncLocalStorage.getStore();
