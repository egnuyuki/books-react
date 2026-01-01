import React, { use, useEffect, useState, useMemo } from "react";
import { Search } from 'lucide-react';
import { list as fetchBooks, remove as deleteBook, update as updateBook } from "../services/booksService";
import BookCard from "../components/BookCard";

const List = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBooks();
        if (mounted) setBooks(data || []);
      } catch (err) {
        console.error("Error loading books:", err);
        if (mounted) setError(err.message || "データ取得に失敗しました");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

    const filteredBooks = useMemo(() => {
        return books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (Array.isArray(book.authors) ? book.authors.join(" ").toLowerCase() : (book.authors || "").toLowerCase()).includes(searchQuery.toLowerCase()) ||
            ((book.isbn_code || book.isbn || "") + "").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [books, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto">
      {loading && <p className="text-yellow-600">読み込み中...</p>}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {!loading && books.length === 0 && (
        <p className="text-yellow-600">登録された本がありません。</p>
      )}

      {/* 検索UI（単一入力・虫眼鏡アイコン） */}
      <div className="mb-6 max-w-xl">
        <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder="タイトル・著者・ISBNで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-yellow-50 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredBooks.length === 0 && !loading ? (
          <div className="text-yellow-600">検索条件に該当する本がありません。</div>
        ) : (
          filteredBooks.map((b) => (
            <BookItem
              key={b.id || b.isbn_code}
              book={b}
              onDeleted={() => setBooks((prev) => prev.filter((x) => x.id !== b.id && x.isbn_code !== b.isbn_code))}
              onUpdated={(newData) => setBooks((prev) => prev.map((x) => (x.id === b.id ? { ...x, ...newData } : x)))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default List;

const BookItem = ({ book, onDeleted, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: book.title || "" });
  const [saving, setSaving] = useState(false);

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      await deleteBook(book.isbn_code || book.isbn);
      onDeleted();
    } catch (err) {
      console.error("削除エラー:", err);
      alert(err.message || "削除に失敗しました");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { id: book.id, isbn_code: book.isbn_code || book.isbn, title: form.title };
      await updateBook(payload);
      onUpdated({ title: form.title });
      setEditing(false);
    } catch (err) {
      console.error("更新エラー:", err);
      alert(err.message || "更新に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {!editing ? (
        <div>
          <BookCard book={book} onEdit={() => setEditing(true)} onDelete={handleDelete} />
        </div>
      ) : (
        <div className="p-4 shadow-lg rounded bg-gray-50">
          <div className="grid grid-cols-1 gap-2">
            <input
              className="p-2 rounded shadow-lg border border-gray-300"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              placeholder="タイトル"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleSave} disabled={saving} className="px-3 py-1 rounded bg-yellow-500 text-white">
                {saving ? "保存中..." : "保存"}
              </button>
              <button onClick={() => setEditing(false)} className="px-3 py-1 rounded bg-gray-300">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
