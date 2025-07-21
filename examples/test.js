const config = require('@leafage/config');

config.loadConfig({
  onUpdate: (c) => {
    console.log('ccccc', c);
  },
})
  .then((res) => {
    console.log('rrrrrrrrrrrrr', res);
  });
