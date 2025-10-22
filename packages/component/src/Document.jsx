import React from 'react';

const Document = ({ Scripts, Links, Context, helmet, children }) => (
  <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.base.toComponent()}
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.noscript.toComponent()}
      <Links />
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      {children}
      <Context />
      <Scripts />
      {helmet.script.toComponent()}
    </body>
  </html>
);

export default Document;
