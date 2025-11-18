export const basePreset = (ctx) => {
  ctx.server.use((req, res, next) => {
    // 设置自定义版权
    res.set('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

    next();
  });
};
