import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

// publicディレクトリのパスにbaseを付与するプラグイン（ビルド時のみ）
// Viteは <a href> による public 配下への直リンクを書き換えないため、ここで補完する
// あわせて、SITE_URL 指定時は canonical / og:url / _next などの絶対URLを差し替える
function publicBasePlugin(base, siteUrl) {
  return {
    name: 'public-base',
    apply: 'build',
    transformIndexHtml(html) {
      html = html.replace(/(src|href)="\/(products|header)\//g, `$1="${base}$2/`);
      if (siteUrl) {
        html = html.replaceAll(GITHUB_PAGES_URL, siteUrl);
      }
      return html;
    },
  };
}

// GitHub Pages の公開URL（HTML内の canonical / og:url / _next で使用）
const GITHUB_PAGES_URL = 'https://asaty94.github.io/website-mitsuwa/';

// 本番サーバー（FTP）向けビルドは BASE_PATH と SITE_URL を指定する
// 例: BASE_PATH=/ SITE_URL=https://www.example.co.jp/ npx vite build
// ※ public/robots.txt と public/sitemap.xml のURLは手動で変更すること
const buildBase = process.env.BASE_PATH ?? '/website-mitsuwa/';
const siteUrl = process.env.SITE_URL; // 未指定ならGitHub Pages URLのまま

export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages用ベースパス（ビルドとpreviewで適用、開発時は /）
  base: command === 'build' || isPreview ? buildBase : '/',

  // ソースファイルの場所
  root: 'src',

  // publicディレクトリ（root: 'src' なのでプロジェクトルートからの相対パスを指定）
  publicDir: '../public',

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
    publicBasePlugin(buildBase, siteUrl),
  ],
}));
