import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  // ソースファイルの場所
  root: 'src',

  // ビルド設定
  build: {
    // 出力先
    outDir: '../dist',
    emptyOutDir: true,
    // 複数ページの設定
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        privacypolicy: resolve(__dirname, 'src/privacypolicy.html'),
      },
    },
  },

  // Handlebarsプラグイン: パーシャル（部品）をHTMLに埋め込む
  plugins: [
    handlebars({
      // パーシャルの場所
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
