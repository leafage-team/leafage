const path = require('path');
const fs = require('fs');

module.exports = {
  prettier: true,
  dependencies: [
    {
      name: 'style-loader',
      ignoreDts: true,
      afterBundle: (task) => {
        fs.cpSync(path.join(task.depPath, 'dist/runtime'), path.join(task.distPath, 'runtime'), { recursive: true });
      },
    },
    'css-loader',
  ],
};
