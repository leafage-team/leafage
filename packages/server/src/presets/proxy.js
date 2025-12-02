import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyPreset = (ctx) => {
  const { proxy } = ctx.config.server;
  if (!proxy) return;

  Object.keys(proxy || {}).forEach((key) => {
    ctx.app.use(key, createProxyMiddleware(proxy[key]));
  });
};
