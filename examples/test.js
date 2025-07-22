const config = require('@leafage/config');

config.loadConfig({
  onUpdate: (c) => {
    // eslint-disable-next-line no-console
    console.log('ccccc', c);
  },
})
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log('rrrrrrrrrrrrr', res);
  });
