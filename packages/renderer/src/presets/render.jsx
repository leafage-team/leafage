import { uneval } from 'devalue';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Helmet, RenderJudge } from '@leafage/component';
import { imports, RenderError } from '@leafage/toolkit';

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
const genContext = (data, config) => (props) => (
  <RenderJudge
    value={Object.keys(data || {})?.length}
    active={(
      <script
        type="text/javascript"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: `${config.globals.context}=${uneval(data)}` }}
        {...props}
      />
    )}
  />
);

export const renderPreset = (ctx) => {
  ctx.render = async (view, props) => {
    try {
      const resource = ctx.findResource(view);
      if (!resource) return '';

      const Document = await imports.importServerModule('Document');
      const App = await imports.importServerModule('App');
      const Component = await imports.importServerModule(resource.view);
      // head config
      const headConfig = ctx.config.head({
        context: ctx.context,
        config: ctx.config,
        isDev: ctx.isDev,
      });
      // render body
      const body = renderToString(
        <>
          <Helmet {...headConfig} />
          <App Component={Component} props={props} />
        </>,
      );
      // helmet
      const helmet = Helmet.renderStatic();
      // render content
      const content = renderToStaticMarkup(
        <Document
          Scripts={genScripts(resource)}
          Links={genLinks(resource)}
          Context={genContext(props, ctx.config)}
          helmet={helmet}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <div id={ctx.config.globals.id} dangerouslySetInnerHTML={{ __html: body }} />
        </Document>,
      );

      return `<!doctype html>${content}`;
    } catch (e) {
      const err = new RenderError(e.message);
      err.stack = e.stack || [];

      return Promise.reject(err);
    }
  };
};
