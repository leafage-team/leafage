import React from 'react';

const Document = ({ Scripts, Links, Context, head, children }) => (
  <html {...head.htmlAttributes.toComponent()}>
    <head>
      {head.base.toComponent()}
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.style.toComponent()}
      {head.noscript.toComponent()}
      <Links />
    </head>
    <body {...head.bodyAttributes.toComponent()}>
      {children}
      <Context />
      <Scripts />
      {head.script.toComponent()}
    </body>
  </html>
);

export default Document;
