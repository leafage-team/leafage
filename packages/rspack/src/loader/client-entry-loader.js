import path from 'path';
import { EOL } from 'os';
import { normalize } from 'pathe';
import { imports, useContext } from '@leafage/toolkit';
import { getInnerComponentPath } from '@/common/utils';

export default function clientEntryLoader() {
  const context = useContext();
  const app = getInnerComponentPath('App', context.options);
  const { external } = context.options;
  const resolveModule = (id) => imports.resolveModule(
    id,
    {
      paths: [
        import.meta.url,
        path.join(context.options.dir.root, context.options.dir.src),
        context.options.dir.root,
        path.join(context.options.dir.root, 'node_modules'),
      ],
    },
  );

  return `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    ${external.map((row) => `import '${resolveModule(row)}';`).join(EOL)}

    import App from '${app}';
    import Component from '${normalize(this.resourcePath)}';

    const props = ${context.options.globals.context};
    const mainEl = document.getElementById('${context.options.globals.id}');

    createRoot(mainEl).render(React.createElement(App, { Component, props }));
  `;
}
