import path from 'path';
import { mkdirp } from 'mkdirp';
import { fs as mfs } from 'memfs';

// https://www.npmjs.com/package/webpack-dev-middleware#outputfilesystem
export const createMfs = () => {
  mfs.join = path.join.bind(path);
  mfs.mkdirp = mkdirp.bind(mkdirp);

  return mfs;
};
