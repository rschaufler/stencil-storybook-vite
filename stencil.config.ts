import { Config } from '@stencil/core'

export const config: Config = {
  namespace: 'stencil-storybook-vite',
  globalStyle: 'src/global-styles/main.css',
  buildDist: true,
  extras: {
    enableImportInjection: true
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  testing: {
    modulePathIgnorePatterns: ['.wireit']
  },
  devServer: {
    reloadStrategy: 'pageReload'
  }
}
