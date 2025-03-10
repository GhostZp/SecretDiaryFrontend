// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
        frontpage: resolve(__dirname, 'src/pages/frontpage.html'),
        habitpage: resolve(__dirname, 'src/pages/habitpage.html'),
        historypage: resolve(__dirname, 'src/pages/historypage.html'),
        loginpage: resolve(__dirname, 'src/pages/loginpage.html'),
      },
    },
  },
  base: './',
});
