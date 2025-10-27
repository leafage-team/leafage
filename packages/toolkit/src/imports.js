import path from 'path';
import { pathToFileURL } from 'url';
import { resolveModulePath } from 'exsolve';
import importFresh from 'import-fresh';

export const directoryToURL = (dir) => pathToFileURL(`${dir}/`);
export const resolveModule = (id, options = {}) => resolveModulePath(id, {
  from: options.url ?? options.paths ?? [import.meta.url],
  extensions: ['.js', '.mjs', '.jsx', '.cjs', '.ts', '.mts', '.cts', '.tsx'],
  try: !!options.try,
});
export const importModule = async (id, options = {}) => {
  const resolvedPath = resolveModule(id, options);

  if (options.isDev) {
    return importFresh(resolvedPath);
  }

  const module = await import(pathToFileURL(resolvedPath).href);

  return module?.default ?? module;
};
export const importServerModule = async (name, options) => {
  const module = await importModule(
    `./${name}`,
    {
      isDev: options.dev,
      url: path.join(options.dir.root, options.dir.dist, options.dir.server),
    },
  );

  return {
    loader: module?.loader,
    Component: module?.default ?? module,
  };
};
