import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: '@storybook/web-components-vite',
  staticDirs: [{ from: '../dist/stencil-storybook-vite', to: 'stencil-storybook-vite' }],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite')

    if (configType !== 'DEVELOPMENT') {
      return config
    }

    return mergeConfig(config, {
      build: {
        // this is set to 'dist' by default which causes hot-reloading for stencil components to break
        // see: https://vitejs.dev/config/server-options.html#server-watch
        // setting it to anything other than dist fixes the issue
        outDir: 'dist-vite'
      },
      plugins: [
        {
          // Storybook 10 accepts HMR updates for preview.ts (and its transitive deps like the
          // Stencil loader) at the project-annotations boundary. That soft re-render cannot pick
          // up rebuilt Stencil components because custom elements cannot be redefined, so force
          // the full page reload that Storybook <= 9 used to do.
          name: 'stencil-force-full-reload',
          handleHotUpdate({ file, server }) {
            if (file.includes('/dist/')) {
              server.ws.send({ type: 'full-reload' })
              return []
            }
          }
        }
      ]
    })
  }
}

export default config
