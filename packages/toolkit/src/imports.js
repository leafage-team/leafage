import { pathToFileURL } from 'node:url';
import { resolveModulePath } from 'exsolve';
import { toArray } from '@/utils';

export const resolveModule = (id, options = {}) => resolveModulePath(id, {
  from: toArray(options.url ?? [import.meta.url]),
  extensions: toArray(options.ext ?? ['.js', '.mjs', '.jsx', '.cjs', '.ts', '.mts', '.cts', '.tsx']),
  try: !!options.try,
});
export const importModule = async (id, options = {}) => {
  const resolvedPath = resolveModule(id, options);

  const module = await import(pathToFileURL(resolvedPath).href);

  return module?.default ?? module;
};
export const importServerModule = async (name, options) => {
  const module = await importModule(`./${name}`, options);

  return module?.default ?? module;
};
