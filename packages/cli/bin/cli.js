#!/usr/bin/env node

require('../dist/index.js').run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
