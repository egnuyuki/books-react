# デジタル本棚アプリ — セットアップガイド

## 初期セットアップ手順

### 1. リポジトリクローン＆依存インストール

```bash
cd /home/koara/web/mbs-app
npm install
```

### 2. 環境変数設定

プロジェクトルートに `.env` ファイルを作成（ .env.example を参考）

```env
VITE_GOOGLE_BOOKS_API_KEY=AIzaSy...your_key...
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your_key...
```

### 3. Supabase テーブル作成

Supabase コンソールで SQL エディタを開き、以下スクリプトを実行：

```sql
CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  isbn_code TEXT NOT NULL,
  title TEXT NOT NULL,
  number TEXT,
  authors TEXT[] DEFAULT NULL,
  publisher TEXT,
  published_date TEXT,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- インデックス作成（検索高速化）
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_isbn ON books(isbn_code);
```

### 4. RLS ポリシー設定（任意）

開発時は以下のように緩く設定：

```sql
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_select" ON books FOR SELECT USING (true);
CREATE POLICY "allow_insert" ON books FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_update" ON books FOR UPDATE USING (true);
CREATE POLICY "allow_delete" ON books FOR DELETE USING (true);
```

### 5. 開発サーバ起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます

---

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser (React)                        │
├────────────┬────────────┬─────────────┬──────────────────────┤
│ Register   │ List       │ Confirm     │ BookCard             │
│ Page       │ Page       │ Dialog      │ Component            │
├────────────┴────────────┴─────────────┴──────────────────────┤
│                                                               │
│  useForm Hook (FormHooks.js)                                 │
│  └─ formData, errors, searchData                             │
│                                                               │
├────────────────────────────────────────────────────────────┤
│                    Services Layer                            │
├────────────────────┬────────────────────────────────────────┤
│ googleBooksService │ booksService                           │
│ └─ searchByIsbn()  │ ├─ create()                            │
│                    │ ├─ list()                              │
│                    │ ├─ update()                            │
│                    │ ├─ remove()                            │
│                    │ └─ checkDuplicateByIsbn()              │
├────────────────────┴────────────────────────────────────────┤
│                                                               │
│  supabaseClient.js (Supabase SDK初期化)                      │
│                                                               │
├───────────────────────────────────────────────────────────┤
│                     External APIs                            │
├──────────────────────┬──────────────────────────────────────┤
│ Google Books API     │ Supabase                             │
│ (ISBN Search)        │ (PostgreSQL Database)                │
└──────────────────────┴──────────────────────────────────────┘
```

---

## データフロー（書籍登録）

```
1. User Input (Register Page)
   ↓
2. ISBN入力 → useForm.handleSearch()
   ↓
3. googleBooksService.searchByIsbn(isbn)
   ├─ API リクエスト → Google Books
   └─ レスポンスを標準化 → searchData に格納
   ↓
4. Confirm Dialog 表示
   ↓
5. User「確認」クリック
   ↓
6. booksService.create(normalizedData)
   ├─ API リクエスト → Supabase
   └─ レコード INSERT
   ↓
7. 成功 → List ページへ遷移
```

---

## データフロー（書籍一覧・検索）

```
1. List Page マウント
   ↓
2. useEffect → booksService.list()
   ├─ Supabase から全件取得
   └─ state.books に格納
   ↓
3. 検索入力 → setSearchQuery()
   ↓
4. useMemo → filteredBooks 計算
   ├─ title, authors, isbn_code を横断検索
   ├─ client-side フィルタリング
   └─ ページング処理
   ↓
5. paginatedBooks をレンダリング
   ├─ 5件単位でページング
   └─ BookItem コンポーネント表示
```

---

## state 管理戦略

### 各ページの state 設計

#### Register ページ
```javascript
const useForm = () => {
  const [formData, setFormData] = useState({ isbn, title, number })
  const [errors, setErrors] = useState({})
  const [searchData, setSearchData] = useState(null)      // 検索結果
  const [isLoading, setIsLoading] = useState(false)
  // ...
}
```

#### List ページ
```javascript
const [books, setBooks] = useState([])              // 全書籍
const [searchQuery, setSearchQuery] = useState("")  // 検索ワード
const [page, setPage] = useState(1)                 // ページ番号
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

// useMemo で計算
const filteredBooks = useMemo(() => {...}, [books, searchQuery])
const paginatedBooks = filteredBooks.slice(...)
```

---

## エラーハンドリング

### API エラー時の挙動

| シナリオ | 処理 |
|---------|------|
| Google Books API エラー | try/catch で捕捉 → alert() で通知 |
| Supabase 接続エラー | error state に格納 → UI 表示 |
| バリデーション失敗 | errors object 更新 → フォーム表示 |
| RLS ポリシー違反 | 403 エラー → "権限なし" メッセージ |

---

## パフォーマンス最適化（実装済み）

- ✅ `useMemo` で filteredBooks 計算キャッシュ
- ✅ Client-side pagination（大規模データは要サーバ化）
- ✅ 画像遅延読み込み対応（img onError）
- ✅ 検索時に自動で1ページ目リセット

### 今後の最適化案
- [ ] Virtual scrolling（1000+ アイテム時）
- [ ] Server-side filtering/pagination
- [ ] Image CDN 活用
- [ ] キャッシング戦略（React Query）

---

## テスト方針

### 手動テストチェックリスト

#### 書籍登録
- [ ] ISBN 10桁入力 → 検索成功
- [ ] ISBN 13桁入力 → 検索成功
- [ ] 無効ISBN入力 → エラー表示
- [ ] 検索結果確認 → 正確なデータ表示
- [ ] 「確認」保存 → Supabase 反映確認
- [ ] 「キャンセル」→ フォーム初期化

#### 書籍一覧
- [ ] ロード成功 → データ表示
- [ ] 空状態 → "登録された本がありません" 表示
- [ ] 検索機能 → タイトル検索成功
- [ ] 検索機能 → 著者検索成功
- [ ] 検索機能 → ISBN検索成功
- [ ] ページング → 前へ/次へ機能
- [ ] ページング → ページ番号正確

#### 編集・削除
- [ ] 編集ボタン → インライン編集フォーム表示
- [ ] タイトル編集 → Supabase 反映
- [ ] 削除ボタン → 確認ダイアログ表示
- [ ] 削除確認 → Supabase から削除

---

## デバッグ方法

### ブラウザコンソール確認
```javascript
// Supabase クライアント確認
import { supabase } from './lib/supabaseClient'
console.log(supabase)

// 直接クエリ実行
const { data, error } = await supabase.from('books').select('*').limit(1)
console.log(data, error)
```

### 環境変数確認
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_GOOGLE_BOOKS_API_KEY)
```

---

## 本番デプロイ前チェックリスト

- [ ] `.env.local` で環境変数設定確認
- [ ] RLS ポリシー適切に設定（重要）
- [ ] Google Books API キーのクォータ確認
- [ ] Supabase バックアップ設定確認
- [ ] エラーログ取得体制構築
- [ ] 大量データでのページネーション性能テスト
- [ ] レスポンシブ UI 確認（mobile/tablet/desktop）
- [ ] ブラウザ互換性テスト

