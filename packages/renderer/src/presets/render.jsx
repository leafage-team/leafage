import { uneval } from 'devalue';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, RenderJudge } from '@leafage/component';
import { imports } from '@leafage/toolkit';

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
const genContext = (data, options) => (props) => (
  <RenderJudge
    value={Object.keys(data || {})?.length}
    active={(
      <script
        type="text/javascript"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: `${options.globals.context}=${uneval(data)}` }}
        {...props}
      />
    )}
  />
);

export const renderPreset = (ctx) => {
  ctx.render = async (view, props) => {
    const resource = ctx.findResource(view);
    if (!resource) return;

    const { Component: Document } = await imports.importServerModule('Document', ctx.options);
    const { Component: App } = await imports.importServerModule('App', ctx.options);
    const { Component } = await imports.importServerModule(resource.view, ctx.options);
    // render body
    const body = renderToString(<App Component={Component} props={props} />);
    // helmet
    const helmet = Helmet.renderStatic();
    // render content
    const content = renderToStaticMarkup(
      <Document
        Scripts={genScripts(resource)}
        Links={genLinks(resource)}
        Context={genContext(props, ctx.options)}
        helmet={helmet}
      >
        {/* eslint-disable-next-line react/no-danger */}
        <div id={ctx.options.globals.id} dangerouslySetInnerHTML={{ __html: body }} />
      </Document>,
    );

    return `<!doctype html>${content}`;
  };
};
