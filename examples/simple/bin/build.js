const { createContext, loadConfig } = require('leafage');

const start = async () => {
  const options = loadConfig();
  const context = await createContext(options);

  console.log('context', context.version);
};

start().catch(() => {
  process.exit(1);
});
