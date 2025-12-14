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

## 機能

- 漫画登録
    1. 書籍情報を入力
        - ISBNコード
        - タイトル
        - 巻数
    2. Google Books API で検索、書籍データ取得
    3. 取得した書籍データを表示
    4. 「確認」「キャンセル」ボタンを表示、「確認」押下でDBに保存
- 漫画一覧
- 購入履歴

## ページ構成

- ホーム `/home`
    - 最新の購入(登録)情報
    - 各ページへのボタン
- 登録 `/register`
    - 登録フォーム
- 一覧 `/list`
    - 検索バー
    - リスト (表示切替)
- 履歴 `/history`

## データ構造

### books

- id
- isbn_code
- title
- number
- authors
- publisher
- publishedDate

※ほかにも必要そうなデータがあれば教えてください
