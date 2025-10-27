export const renderErrorPreset = (ctx) => {
  ctx.renderError = async (error) => {
    const { message, statusCode } = error;

    const html = await ctx.render('Error', { statusCode, message });

    return { html };
  };
};
