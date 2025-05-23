import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue2(),
    federation({
      name: 'host',
      remotes: {
        commons: 'http://localhost:6969/remoteEntry.js',
      },
      shared: ['vue'],
    }),
  ],
  server: {
    port: 3000,
  },
})
