import { pathToFileURL } from 'url';
import { resolveModulePath } from 'exsolve';
import importFresh from 'import-fresh';

export const directoryToURL = (dir) => pathToFileURL(`${dir}/`);
export const resolveModule = (id, options = {}) => resolveModulePath(id, {
  from: options.url ?? options.paths ?? [import.meta.url],
  extensions: ['.js', '.mjs', '.jsx', '.cjs', '.ts', '.mts', '.cts', '.tsx'],
});
export const importModule = async (id, options = {}) => {
  const resolvedPath = resolveModule(id, options);

  let res;
  if (options.isDev) {
    res = await importFresh(resolvedPath);
  } else {
    res = await import(pathToFileURL(resolvedPath).href);
  }

  return res?.default ?? res;
};
