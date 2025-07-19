// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/BGN-FE/', // sesuai dengan nama repo kamu!
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://167.99.76.27:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
