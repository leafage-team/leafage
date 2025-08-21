export const createContext = (context) => ({
  context,
  options: context.options,
  isDev: context.options.dev,
  resources: [],
  findResource: () => null,
  renderRoute: () => '',
  render: () => '',
});
