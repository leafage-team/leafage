import { uneval } from 'devalue';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Head as HeadComponent, RenderJudge } from '@leafage/component';
import { error, imports } from '@leafage/toolkit';

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

      const Document = await imports.importServerModule('Document', { url: ctx.config.output.server });
      const App = await imports.importServerModule('App', { url: ctx.config.output.server });
      const Component = await imports.importServerModule(resource.view, { url: ctx.config.output.server });
      // head config
      const headConfig = ctx.config.head({
        context: ctx.context,
        config: ctx.config,
        isDev: ctx.isDev,
      });
      // render body
      const body = renderToString(
        <>
          <HeadComponent {...headConfig} />
          <App Component={Component} props={props} />
        </>,
      );
      // head
      const headStatic = HeadComponent.renderStatic();
      // render content
      const content = renderToStaticMarkup(
        <Document
          Scripts={genScripts(resource)}
          Links={genLinks(resource)}
          Context={genContext(props, ctx.config)}
          head={headStatic}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <div id={ctx.config.globals.id} dangerouslySetInnerHTML={{ __html: body }} />
        </Document>,
      );

      return `<!doctype html>${content}`;
    } catch (e) {
      return Promise.reject(new error.RenderError(e));
    }
  };
};
