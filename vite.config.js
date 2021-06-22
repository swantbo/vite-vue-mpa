import { defineConfig } from 'vite';
import mpa from 'vite-plugin-mpa';
import vue from '@vitejs/plugin-vue';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    entries: 'vant/es/**/*.js',
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false;
            }
            return `vant/es/${name}/style/index.js`;
          },
        },
      ],
    }),
    mpa({
      open: '',
      scanDir: 'src/pages',
      scanFile: 'main.js',
      filename: 'index.html',
    }),
  ],
});
