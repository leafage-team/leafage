const { createContext } = require('leafage');

const start = async () => {
  const content = await createContext();

  console.log('contentcontentcontent', content.version);
  await content.ready();
};

start().catch(() => {
  process.exit(1);
});
