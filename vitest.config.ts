import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [
          'src/main.ts',
          'src/router/index.ts',
          'src/store/index.ts',
          'src/components/',
          'src/main.ts',
          'index.html',
          'package.json',
          'tsconfig.json',
          'eslint.config.ts',
          'vite.config.ts',
          'vitest.config.ts',
          'env.d.ts',
        ],
      },
    },
  }),
)
