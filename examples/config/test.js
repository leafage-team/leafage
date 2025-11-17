const toolkit = require('@leafage/toolkit');

process.env.NODE_ENV = 'development';

toolkit.loadConfig()
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log('userConfig', res);

    return toolkit.mergeConfig(res);
  })
  .then((res) => {
    // eslint-disable-next-line no-console
    console.log('mergeConfig', res);
  });
