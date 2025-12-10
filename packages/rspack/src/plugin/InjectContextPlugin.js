class InjectContextPlugin {
  constructor(bundleContext) {
    this.bundleContext = bundleContext;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InjectContextPlugin', (compilation) => {
      const { NormalModule } = compiler.rspack || compiler.webpack;
      const hooks = NormalModule.getCompilationHooks(compilation);
      hooks.loader.tap('InjectContextPlugin', (loaderContext) => {
        loaderContext.bundleContext = this.bundleContext;
      });
    });
  }
}

export { InjectContextPlugin };
