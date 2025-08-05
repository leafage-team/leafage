import React from 'react';

const Document = ({ Script, Link: DocLink, helmet, context, children }) => (
  <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.base.toComponent()}
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.noscript.toComponent()}
      <DocLink />
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      {children}
      {context}
      <Script />
      {helmet.script.toComponent()}
    </body>
  </html>
);

export default Document;
