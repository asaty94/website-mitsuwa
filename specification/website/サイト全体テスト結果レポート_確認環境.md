# STEP1｜サイト全体テスト 結果レポート（issue #3）

- **対象**: 株式会社ミツワ電子器製作所 ウェブサイト
- **実施日**: 2026-08-25
- **実施者**: Claude Code（自動）＋ オーナー手動（項目2・3・6）
- **テスト対象の配信方法**: 本番と同じビルド成果物（`dist/`）を、GitHub Pages と同一パス `/website-mitsuwa/` で静的配信して検証（`npx vite preview` 相当）
- **関連**: 本番移行後の追加テストは issue #5 に記載

---

## 判定サマリー

| # | 確認項目 | 判定 | 実施者 |
|---|---|---|---|
| 1 | 全ページの表示崩れ | ✅ 合格 | Claude |
| 2 | ヘッダー・フッター・内部リンクのリンク切れ | ✅ 合格 | Claude |
| 3 | 問い合わせフォームの送信（クライアント検証） | ✅ 合格 | Claude |
| 4 | 画像・PDFの表示・ダウンロード | ✅ 合格 | Claude |
| 5 | メタ情報（title / description / OGP） | ✅ 合格 | Claude |
| 6 | レスポンシブ表示（スマホ／タブレット／PC） | ✅ 合格 | オーナー |
| 7 | 主要ブラウザ（Chrome / Safari / Edge） | ✅ 合格（Edgeは未実施） | オーナー |
| 8 | 問い合わせフォームの実メール到達 | ⏭️ 本番移行後に実施（issue #5 タスク6へ） | オーナー |

凡例: ✅ 合格 ／ ⏳ 確認待ち ／ ⏭️ 別STEPへ送り

---

## 1. 全ページの表示崩れ ✅

ブラウザ実表示（デスクトップ幅）で3ページを確認。いずれも崩れなし。

| ページ | URL | 結果 |
|---|---|---|
| トップ | `/website-mitsuwa/` | ヒーロー（背景写真・スライド・見出し）、製品紹介（変圧器7点・ドロッパー8点）、会社概要表、住所＋地図、問い合わせフォーム、フッター、すべて正常 |
| 個人情報保護方針 | `/website-mitsuwa/privacypolicy.html` | 見出し・本文・連絡先・戻るボタン正常 |
| 送信完了 | `/website-mitsuwa/thanks.html` | 見出し・メッセージ・戻るボタン・フッター正常 |

- デスクトップ幅で横スクロールの発生なし（`scrollWidth == clientWidth == 1905px`）。
- 製品カードのスクロール表示アニメーション（fade-in）も正常動作。

## 2. リンク切れ ✅

ページ内の全リンクの遷移先を機械的に照合。切れなし。

- ヘッダー: `index.html` / `index.html#products` / `#company` / `#map` / `#contact` → 全て有効（対象セクションIDは実在）
- フッター: 上記＋ `privacypolicy.html` → 有効
- 製品カードの「寸法を見る」「仕様を見る」: 参照先ファイルは**全て実在・HTTP 200**（下記4参照）
- ビルド時のパス書き換えも検証: `/products/` `/header/` 参照は全て `/website-mitsuwa/` 接頭辞に変換済み（未変換 0 件）、CSS/JS も `/website-mitsuwa/assets/` を正しく参照

## 3. 問い合わせフォーム（クライアント側検証） ✅

`checkValidity()` 等で挙動を確認。

- 未入力での送信は**ブロックされる**（HTML5必須検証）
- 必須項目: `お名前` `メールアドレス` `お問い合わせ内容` の3つ
- 3項目を入力すると送信可能になる
- スパム対策: ハニーポット（`_honey`）あり、`_captcha=true` 有効
- 送信先: `https://formsubmit.co/mitsuwa@iris.eonet.ne.jp`（method=POST）
- 送信完了遷移先 `_next`: `https://asaty94.github.io/website-mitsuwa/thanks.html`

> ⚠️ **実際のメール到達テストは未実施**（プレビューから実送信していない）。本番移行後に issue #5 タスク6 で実施。
> ⚠️ 現状 `action` にメールアドレスが平文。本番では FormSubmit のエイリアスへ差し替え（issue #5 タスク4）。

## 4. 画像・PDF ✅

配信レスポンスとファイル実体の両方を検証。破損・ゼロバイトなし。

- 配信MIME: 画像 `image/jpeg`、PDF `application/pdf`、CSS `text/css` を確認（HTTP 200）
- PDF実体: ドロッパー各製品の `drawing.pdf` / `spec.pdf` は全て**正常な単一ページ PDF（v1.4）**
- 画像実体: ヘッダー4点＋製品各画像は全て**正常な JPEG**
- 参照されているアセットは全て存在（欠損 0 件）

> メモ: `products/dropper/MPS-10/img.jpeg` が 776KB とやや大きめ（表示は問題なし）。将来的に軽量化の余地あり。

## 5. メタ情報（title / description / OGP） ✅

| ページ | title | description | OGP | 備考 |
|---|---|---|---|---|
| トップ | ✅ | ✅ | ✅ og:title/description/type/url/image, twitter:card=summary_large_image | canonical あり |
| プライバシー | ✅ | ✅ | ✅ | canonical あり |
| サンクス | ✅ | — | — | `robots=noindex`（検索除外・適切） |

- `og:image` はヘッダー写真（`header/01.jpg`）の絶対URL。プレビューでは GitHub Pages URL、本番では `SITE_URL` 置換で本番ドメインへ（issue #5 タスク1）。

---

## 6. レスポンシブ表示 ✅（オーナー確認・合格）

**オーナーが Chrome DevTools デバイスモードで目視確認 → 問題なし。** CSS検証結果とも一致。

**CSS検証で確認済みの内容:**
- Bootstrap `navbar-expand-md` → 768px 未満でハンバーガーメニュー化
- `col-md-4` → 768px 以上で3列、未満で1列縦積み
- メディアクエリ `@media (max-width: 768px)` / `(max-width: 576px)` でヒーロー・余白・フッター縦積み・画像高さ・テーブル幅を調整
- `box-sizing: border-box`、入力欄 `width:100%`、固定ピクセル幅なし → 横溢れリスクなし

### 確認結果（Chrome DevTools デバイスモードで確認）

- [x] スマホ幅 375/390: ハンバーガーメニューになり開閉できる
- [x] スマホ幅 375/390: 製品カードが1列に縦積み
- [x] スマホ幅 375/390: フッターが縦積み・中央寄せ
- [x] タブレット幅 768/820: 製品カードが3列
- [x] 全幅共通: 右方向へのはみ出し（横スクロール）が出ない
- [x] 全幅共通: ヒーロー文字・表・地図・フォームが画面幅に収まる
- [x] 全幅共通: ボタンが押しやすい大きさ・重なりなし

確認日: 2026-08-26　確認者: オーナー　所見: 問題なし

---

## 7. 主要ブラウザ ✅（Chrome・Safari 合格／Edge 未実施）

**Chrome 合格**（上記1〜5は全て Chrome で検証）。**Safari 合格**（オーナー確認）。**Edge は未実施**（オーナー判断でテスト終了）。標準的な Bootstrap5＋バニラJS 構成でブラウザ固有ハックは無いため、Chrome/Safari で問題なければ Edge（Chromium系）も同等の見込み。

### 確認結果

**Safari** ✅ 合格（`aspect-ratio` / `object-fit` / 固定ヘッダーの差異が出やすい箇所も含め確認）
- [x] ヒーロー背景写真が表示・スライド切替する
- [x] 製品カード画像が枠内に正しく収まる
- [x] ヘッダーがスクロール後も上部固定
- [x] フォームの見た目が崩れない
- [x] 地図が表示される
- [x] 「寸法/仕様を見る」で PDF/画像が新規タブで開く
- [x] 電話番号リンクで発信ダイアログが出る

確認日: 2026-08-26　所見: 問題なし

**Edge** ⏭️ 未実施（オーナー判断で省略。必要になれば同URLを Edge で開き同項目を確認）
- [ ] 上記と同項目（画像・フォーム・地図・PDFリンク・表示崩れ）を確認

確認日: ____________　所見: ____________

---

## テスト方法（再現手順）

```bash
cd /Users/asaty/Documents/01_Workspace/website-mitsuwa
npx vite build      # 変更があった場合のみ
npx vite preview    # http://localhost:4173/website-mitsuwa/ で本番同等配信
```

- スマホ実機で見る場合: `npx vite preview --host` → 表示される `Network:` のURLへ同一Wi-Fiのスマホからアクセス

---

## 本番移行（issue #5）で対応する項目（本レポートの範囲外）

1. 本番用ビルド `BASE_PATH=/ SITE_URL=https://本番ドメイン/ npx vite build`
2. `public/robots.txt` のURL手動修正
3. `public/sitemap.xml` のURL手動修正
4. FormSubmit 有効化 → `form action` をエイリアスへ差し替え（平文メール対策）
5. `dist/` を FTP/SFTP でアップロード
6. アップロード後：フォーム実送信・メール到達テスト（本レポート項目8）
