# デジタル本棚アプリ

## 概要

購入した漫画を管理するアプリ
漫画を購入する際に、以前に購入したかどうかを把握できる

## 技術スタック

- React
- React-router
- TailwindCSS
- Supabase
- axios
- googleapis

## 実装状況（2026年2月11日）

### ✅ 完了機能

- [x] 書籍登録 (`/register`)
    - [x] ISBN入力（10桁/13桁対応）
    - [x] Google Books API で検索、書籍データ取得
    - [x] 取得した書籍データを確認ダイアログ表示
    - [x] 「確認」「キャンセル」ボタン実装
    - [x] Supabase にデータ保存

- [x] 書籍一覧 (`/list`)
    - [x] Supabase からの全書籍取得・表示
    - [x] 検索機能（タイトル/著者/ISBN横断）
    - [x] ページネーション（1ページ5件）
    - [x] 編集機能（タイトルのみ）
    - [x] 削除機能（確認ダイアログ付）
    - [x] BookCard コンポーネント表示

- [x] ルーティング
    - [x] React Router 導入
    - [x] ページ間遷移

### ⏳ 実装予定機能

- [ ] ホーム (`/home`) — 最新の購入情報＆ナビゲーション
- [ ] ユーザー認証（今後検討）

## ページ構成

**完了済み:**
- ✅ 登録 `/register` — 書籍登録フォーム
- ✅ 一覧 `/list` — 検索・編集・削除機能付き

**今後追加:**
- ホーム `/home` — ダッシュボード（検討中）
- ユーザー認証 — Supabase Auth（検討中）

## データ構造

### books テーブル（Supabase）

| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | uuid | Primary Key |
| isbn_code | text | ISBNコード（10/13桁） |
| title | text | 書籍タイトル |
| number | text | 巻数 |
| authors | text[] | 著者（複数対応） |
| publisher | text | 出版社 |
| published_date | text | 出版日 |
| cover_url | text | 表紙画像 URL |
| created_at | timestamptz | 登録日時 |

---

## 関連ドキュメント

- [IMPLEMENTATION.md](./IMPLEMENTATION.md) — 実装完了機能の詳細
- [SETUP.md](./SETUP.md) — セットアップ手順とアーキテクチャ
