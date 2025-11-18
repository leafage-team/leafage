export const aliasPreset = (ctx) => {
  ctx.config.resolve.alias = ctx.config.builder.alias;
};
