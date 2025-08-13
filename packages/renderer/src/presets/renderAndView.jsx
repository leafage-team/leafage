import { uneval } from 'devalue';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, RenderJudge } from '@leafage/component';

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
        dangerouslySetInnerHTML={{ __html: `${options.globals.context}=${uneval(props)}` }}
      />
    )}
  />
);

export const renderAndViewPreset = (ctx) => {
  ctx.renderAndView = async (view, props) => {
    const resource = ctx.resources.find((row) => row.view === view);
    if (!resource) {
      return;
    }
    const { Component: Document } = await ctx.import('Document');
    const { Component: App } = await ctx.import('App');
    const { Component } = await ctx.import(resource.view);
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
