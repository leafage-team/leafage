import path from 'path';
import { EOL } from 'os';
import { normalize } from 'pathe';
import { imports, useContext } from '@leafage/toolkit';
import { getInnerComponentPath } from '../common/utils';

export default function clientEntryLoader() {
  const ctx = useContext();
  const app = getInnerComponentPath('App', ctx.options);
  const resolveModule = (id) => {
    const modulePath = imports.resolveModule(
      id,
      {
        paths: [
          import.meta.url,
          ctx.options.input.src,
          ctx.options.root,
          path.join(ctx.options.root, 'node_modules'),
        ],
        try: true,
      },
    );

    return modulePath ?? id;
  };
  // head config
  const headConfig = ctx.options.head({
    context: ctx.context,
    config: ctx.options,
    isDev: ctx.isDev,
  });

  return `
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { Helmet } from '@leafage/component';
    ${ctx.options.externals.map((row) => `import '${resolveModule(row)}';`).join(EOL)}

    import App from '${app}';
    import Component from '${normalize(this.resourcePath)}';

    const props = ${ctx.options.globals.context};
    const mainEl = document.getElementById('${ctx.options.globals.id}');

    const main = React.createElement(
      React.Fragment,
      null,
      React.createElement(Helmet, ${JSON.stringify(headConfig)}),
      React.createElement(App, {
        Component,
        props,
      }),
    );
    createRoot(mainEl).render(main);
  `;
}
