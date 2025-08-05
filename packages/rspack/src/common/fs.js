import fs from 'fs';
import { fs as memfs } from 'memfs';

export const mfs = process.env.NODE_ENV === 'development' ? memfs : fs;
