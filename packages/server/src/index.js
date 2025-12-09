import { useContext } from '@leafage/toolkit';

export { Server } from './server';
export const useServer = () => useContext().server;
export const useConfig = () => useContext().config;
export const useRenderer = () => useContext().renderer;
