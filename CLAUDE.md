# ミツワ電子器製作所 ウェブサイト

## プロジェクト概要
株式会社ミツワ電子器製作所（京都）のコーポレートサイト。変圧器・ドロッパー電源の製造メーカー。

## 技術スタック
- **ビルド**: Vite（静的HTML出力）
- **CSS**: Bootstrap 5 + CSSカスタムプロパティ
- **JS**: バニラJS（最小限）
- **フォント**: Noto Sans JP
- **言語**: 日本語

## ディレクトリ構成
```
src/           ソースファイル
  css/         スタイルシート
  js/          JavaScript
  partials/    HTMLパーシャル（ヘッダー、フッター、製品紹介）
public/        静的アセット（画像、PDF、robots.txt等）
dist/          ビルド出力（gitignore対象）
```

## 開発コマンド
- `npx vite` — 開発サーバー起動
- `npx vite build` — 本番ビルド（dist/ に出力）

## デプロイフロー
1. GitHub Pages でプレビュー → 依頼者確認
2. 承認後、dist/ 内のファイルを FTP/SFTP で本番サーバーにアップロード

## 規約
- コミットメッセージは日本語で記述
- CSSの色値はカスタムプロパティ（variables.css）で管理
- HTMLコンポーネントは partials/ にパーシャルとして管理
