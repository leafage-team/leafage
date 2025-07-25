const toolkit = require('@leafage/toolkit');

toolkit.loadConfig({
  onUpdate: (c) => {
    // eslint-disable-next-line no-console
    console.log('ccccc', c);
  },
})
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log('rrrrrrrrrrrrr', res);
  });
