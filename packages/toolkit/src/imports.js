import { pathToFileURL } from 'url';
import { resolveModulePath } from 'exsolve';
import { useContext } from './context';

export const resolveModule = (id, options = {}) => resolveModulePath(id, {
  from: options.url ?? options.paths ?? [import.meta.url],
  extensions: ['.js', '.mjs', '.jsx', '.cjs', '.ts', '.mts', '.cts', '.tsx'],
  try: !!options.try,
});
export const importModule = async (id, options = {}) => {
  const resolvedPath = resolveModule(id, options);

  const module = await import(pathToFileURL(resolvedPath).href);

  return module?.default ?? module;
};
export const importServerModule = (name) => {
  const ctx = useContext();

  return importModule(`./${name}`, { url: ctx.config.output.server });
};
