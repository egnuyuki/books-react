import React, { use, useEffect, useState, useMemo } from "react";
import { Search, ArrowDownUp } from 'lucide-react';
import { list as fetchBooks, remove as deleteBook, update as updateBook } from "../services/booksService";
import BookCard from "../components/BookCard";

const List = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByNumber, setSortByNumber] = useState("desc");

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

  // Pagination (client-side)
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / itemsPerPage));

  // Reset to first page on new search
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Clamp page when filteredBooks change
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [filteredBooks.length, totalPages]);

  const paginatedBooks = filteredBooks.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const soartedPaginatedBooks = searchQuery
    ? ( sortByNumber === "asc"
        ? paginatedBooks.sort((a, b) => (a.number || 0) - (b.number || 0))
        : paginatedBooks.sort((a, b) => (b.number || 0) - (a.number || 0))
      )
    : paginatedBooks;

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

      {/* 検索時は巻数（デフォルト降順）でソート */}
      {searchQuery && soartedPaginatedBooks.length > 0 && (
        <div className="flex items-center gap-2 mb-4 justify-between">
          <div className="text-sm text-white">
            検索結果を巻数（{sortByNumber === "asc" ? "昇順" : "降順"}）で表示しています
          </div>
          <button onClick={() => setSortByNumber(sortByNumber === "asc" ? "desc" : "asc")}>
            <ArrowDownUp className="text-white"/>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {soartedPaginatedBooks.length === 0 && !loading ? (
          <div className="text-white">検索条件に該当する本がありません。</div>
        ) : (
          soartedPaginatedBooks.map((b) => (
            <BookItem
              key={b.id || b.isbn_code}
              book={b}
              onDeleted={() => setBooks((prev) => prev.filter((x) => x.id !== b.id && x.isbn_code !== b.isbn_code))}
              onUpdated={(newData) => setBooks((prev) => prev.map((x) => (x.id === b.id ? { ...x, ...newData } : x)))}
            />
          ))
        )}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-500' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
        >
          前へ
        </button>
        <div className="text-sm text-yellow-50">
          {page} / {totalPages}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
        >
          次へ
        </button>
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
