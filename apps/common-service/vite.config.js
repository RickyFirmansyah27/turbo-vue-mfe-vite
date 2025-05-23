import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import { federation } from '@module-federation/vite';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    vue2(),
    federation({
      name: 'commons',
      filename: 'remoteEntry.js',
      exposes: {
        './Utils': './src/utils',
        './Components': './src/components/index',
      },
      shared: ['vue']
    }),
    topLevelAwait()
  ],
  server: {
    port: 6969,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false
  },
  preview: {
    port: 6969
  }
});