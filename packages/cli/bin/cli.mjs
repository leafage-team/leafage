#!/usr/bin/env node
import nodeModule from 'node:module';
import { run } from '../dist/main.js';

// enable on-disk code caching of all modules loaded by Node.js
// requires Nodejs >= 22.8.0
const { enableCompileCache } = nodeModule;
if (enableCompileCache) {
  try {
    enableCompileCache();
  } catch {
    // ignore errors
  }
}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
