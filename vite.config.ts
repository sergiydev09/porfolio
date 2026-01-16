import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://europe-west1-savaitech.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/chat')
      }
    }
  }
});
