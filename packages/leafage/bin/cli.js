#!/usr/bin/env node

require('@leafage/cli').run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
