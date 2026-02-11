# デジタル本棚アプリ — 実装ドキュメント

**更新日**: 2026年2月11日  
**ステータス**: MVP実装完了

---

## 実装完了機能一覧

### 1. ルーティング（React Router）
- ✅ `AppRouter.jsx` でルート定義（`/register`, `/list` 等）
- ✅ ページ間遷移機能実装

### 2. 書籍登録ページ `/register`
- ✅ ISBN入力フォーム（バリデーション付）
- ✅ Google Books API 連携
  - `googleBooksService.searchByIsbn(isbn)` で検索実装
  - ISBN 10桁/13桁対応、バリデーション
- ✅ 検索結果確認ダイアログ表示
- ✅ Supabase 保存機能
  - `booksService.create()` で書籍データ保存
  - 巻数（number）対応

### 3. 書籍一覧ページ `/list`
- ✅ Supabase から全書籍取得・表示
- ✅ BookCard コンポーネントで書籍情報表示
  - 表紙画像、タイトル、著者、出版社、出版日表示
  - プレースホルダー画像対応
- ✅ 検索機能
  - タイトル・著者・ISBN横断検索
  - リアルタイムフィルタリング
  - 虫眼鏡アイコン UI
- ✅ ページネーション
  - 1ページあたり5アイテム
  - 前へ/次へボタン、ページ番号表示
  - 検索時に1ページ目へ自動リセット
- ✅ 編集機能
  - タイトルのみ編集可能
  - `booksService.update()` で Supabase 更新
  - インライン編集フォーム UI
- ✅ 削除機能
  - 確認ダイアログ付き
  - `booksService.remove()` で削除実装

### 4. データベース（Supabase）
- ✅ `books` テーブル構造
  ```
  - id (uuid, primary key)
  - isbn_code (text)
  - title (text)
  - number (text/int)
  - authors (text[] or text)
  - publisher (text)
  - published_date (date/text)
  - cover_url (text)
  - created_at (timestamptz)
  ```
- ✅ Row Level Security (RLS) 確認
  - ユーザー単位管理なし（anon キー使用）

### 5. 環境設定
- ✅ `.env` 設定（必須変数）
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_GOOGLE_BOOKS_API_KEY`
- ✅ `.env.example` 作成済み

### 6. UI/デザイン
- ✅ TailwindCSS スタイリング
- ✅ レスポンシブ対応（mobile-first）
- ✅ 虫眼鏡アイコン（lucide-react 使用）
- ✅ ボタン/フォーム スタイル統一
- ✅ エラーメッセージ・ローディング表示

---

## 実装構成図

```
src/
├── pages/
│   ├── Register.jsx          (ISBN入力→検索→確認→保存)
│   └── List.jsx              (一覧表示・検索・編集・削除・ページネーション)
├── components/
│   ├── Form.jsx              (登録フォーム)
│   ├── Confirm.jsx           (確認ダイアログ)
│   └── BookCard.jsx          (書籍カード)
├── hooks/
│   ├── FormHooks.js          (フォーム状態管理)
│   └── dbHooks.js            (DB操作ラッパー)
├── services/
│   ├── googleBooksService.js (Google Books API)
│   └── booksService.js       (Supabase CRUD)
├── lib/
│   └── supabaseClient.js     (Supabase初期化)
├── AppRouter.jsx             (ルーティング定義)
├── App.jsx                   (ルーター マウント)
└── index.css                 (Tailwind指令)
```

---

## 主要ファイル解説

### `src/services/googleBooksService.js`
Google Books API を使用した ISBN 検索機能
```javascript
export async function searchByIsbn(isbn)
// 戻り値: { isbn_code, title, authors, publisher, publishedDate, cover_url }
```

### `src/services/booksService.js`
Supabase `books` テーブル CRUD 操作
```javascript
export const create(bookData)    // 書籍保存
export const list()              // 全書籍取得（created_at 降順）
export const update(bookData)    // 書籍更新
export const remove(isbn)        // 書籍削除
export const checkDuplicateByIsbn(isbn)  // 重複チェック
```

### `src/hooks/FormHooks.js`
書籍登録フォームの状態管理 useForm Hook
```javascript
const useForm = () => {
  // state: formData, errors, isLoading, searchData
  // handler: handleInputChange, handleSearch
}
```

---

## 使用ライブラリ

| ライブラリ | 用途 | バージョン |
|-----------|------|----------|
| `react` | UI フレームワーク | ^19.2.0 |
| `react-router-dom` | ルーティング | ^7.9.4 |
| `@supabase/supabase-js` | DB クライアント | - |
| `axios` | HTTP クライアント | ^1.12.2 |
| `tailwindcss` | CSS フレームワーク | - |
| `lucide-react` | アイコン | - |

---

## 環境変数（`.env`）

```
VITE_GOOGLE_BOOKS_API_KEY=your_google_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 開発コマンド

```bash
# 依存インストール
npm install

# 開発サーバ起動
npm run dev

# ビルド
npm run build

# ESLint チェック
npm run lint
```

---

## 今後の拡張案

### ✋ 実装予定
- [ ] Home ページ（最新登録情報＆ナビゲーション）
- [ ] 購入日管理
- [ ] 読了状況フラグ
- [ ] ユーザー認証（Supabase Auth）
- [ ] 複数表示モード（グリッド/リスト切替）
- [ ] CSV インポート機能
- [ ] 整列機能（タイトル/著者/日付別）

### 💡 検討中
- バーコードスキャン機能
- タグ/カテゴリ分類
- 蔵書統計・ダッシュボード
- PDF エクスポート

---

## トラブルシューティング

### Google Books API が 403 エラーを返す
- API キーが有効か確認してください
- API コンソールで Books API が有効化されているか確認

### Supabase に保存されない
- RLS ポリシー確認：開発は一時的に緩和してテスト
- anon キーで INSERT 権限があるか確認
- テーブルカラム名が実装と一致しているか確認

### 検索が機能しない
- ブラウザコンソール確認（JS エラー）
- Redux DevTools で state 状態を確認
- ネットワークタブで API リクエスト確認

---

## 参考リンク

- [Supabase ドキュメント](https://supabase.com/docs)
- [Google Books API](https://developers.google.com/books)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)

