import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

// publicディレクトリのパスにbaseを付与するプラグイン
function publicBasePlugin(base) {
  return {
    name: 'public-base',
    transformIndexHtml(html) {
      return html.replace(/(src|href)="\/image\//g, `$1="${base}image/`);
    },
  };
}

export default defineConfig({
  // GitHub Pages用ベースパス
  base: '/website-mitsuwa/',

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
        thanks: resolve(__dirname, 'src/thanks.html'),
      },
    },
  },

  // プラグイン
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
    publicBasePlugin('/website-mitsuwa/'),
  ],
});
