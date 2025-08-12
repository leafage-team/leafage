import path from 'path';
import { stringify } from 'devalue';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { imports } from '@leafage/toolkit';
import { Helmet, RenderJudge } from '@leafage/component';

const requireComponentByName = async (name, options) => {
  const component = await imports.importModule(
    `./${name}`,
    {
      paths: [path.join(options.dir.root, options.dir.dist, options.dir.server)],
    },
  );

  return component?.default ?? component;
};
const genScripts = (resource) => ({ defer = true, ...props }) => resource.scripts.map((src) => (
  <script
    src={src}
    key={src}
    type="text/javascript"
    defer={defer}
    {...props}
  />
));
const genLinks = (resource) => (props) => resource.styles.map((href) => (
  <link
    href={href}
    key={href}
    rel="stylesheet"
    {...props}
  />
));
const getRenderContext = (props, options) => (
  <RenderJudge
    value={Object.keys(props || {})?.length}
    active={(
      <script
        type="text/javascript"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: `${options.globals.context}=${stringify(props)}` }}
      />
    )}
  />
);

export const renderPreset = (ctx) => {
  let Document;
  let App;

  ctx.render = async (view, props) => {
    const resource = ctx.resources.find((row) => row.view === view);
    if (!resource) {
      throw new Error(`Resource not found for view ${view}`);
    }
    if (!Document) {
      Document = await requireComponentByName('Document', ctx.options);
    }
    if (!App) {
      App = await requireComponentByName('App', ctx.options);
    }
    const Component = await requireComponentByName(resource.view, ctx.options);
    // render body
    const body = renderToString(<App Component={Component} props={props} />);
    // helmet
    const helmet = Helmet.renderStatic();
    // render content
    const content = renderToStaticMarkup(
      <Document
        Scripts={genScripts(resource)}
        Links={genLinks(resource)}
        helmet={helmet}
        context={getRenderContext(props, ctx.options)}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div id={ctx.options.globals.id} dangerouslySetInnerHTML={{ __html: body }} />
      </Document>,
    );

    return `<!doctype html>${content}`;
  };
};
