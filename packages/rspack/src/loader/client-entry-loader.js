import { EOL } from 'os';
import { normalize } from 'pathe';
import { useContext } from '@leafage/toolkit';
import { getInnerComponentPath } from '@/common/utils';

export default function clientEntryLoader() {
  const context = useContext();
  const app = getInnerComponentPath('App', context.options);
  const { external } = context.options;

  return `
    import React from 'react';
    import { createRoot } from 'react-dom/client';

    import App from '${app}';
    import Component from '${normalize(this.resourcePath)}';
    ${external.map((row) => `import '${context.resolveModule(row)}';`).join(EOL)}

    const props = ${context.options.globals.context};
    const mainEl = document.getElementById('${context.options.globals.id}');

    createRoot(mainEl).render(React.createElement(App, { Component, props }));
  `;
}
