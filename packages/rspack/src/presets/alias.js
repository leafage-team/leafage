export const aliasPreset = (ctx) => {
  ctx.config.resolve.alias = ctx.options.builder.alias;
};
