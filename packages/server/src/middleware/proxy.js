import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyMiddleware = (server) => {
  const { proxy } = server.config.server;
  if (!proxy) return;

  Object.keys(proxy || {}).forEach((key) => {
    server.useMiddleware(key, createProxyMiddleware(proxy[key]));
  });
};
