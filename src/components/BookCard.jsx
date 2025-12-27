import React from "react";

const BookCard = ({ book, onEdit, onDelete }) => {
  if (!book) return null;

  const title = book.title || book.title || "タイトル不明";
  const authors = Array.isArray(book.authors)
    ? book.authors.join(", ")
    : book.authors || "不明";
  const publisher = book.publisher || book.publisher || "不明";
  const published = book.published_date || book.publishedDate || "不明";
  const cover = book.cover_url || book.thumbnail || "/placeholder-book.png";

  return (
    <article className="flex gap-4 p-4 rounded-md bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-24 h-38 shrink-0 bg-gray-100 overflow-hidden rounded">
        <img
          src={cover}
          alt={title}
          className="object-cover w-full h-full"
          onError={(e) => (e.target.src = "/placeholder-book.png")}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="text-lg font-semibold text-gray-900 truncate">{title}</div>
        <p className="text-sm text-gray-600">著者: {authors}</p>
        <p className="text-sm text-gray-600">出版社: {publisher}</p>
        <p className="text-sm text-gray-500">出版日: {published}</p>

        {(onEdit || onDelete) && (
          <div className="mt-3 flex gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
              >
                編集
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                削除
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default BookCard;
