export const createContext = (context) => ({
  context,
  options: context.options,
  isDev: context.options.dev,
  resources: [],
  renderAndView: () => '',
  renderAndUrl: () => '',
});
