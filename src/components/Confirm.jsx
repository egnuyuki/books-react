import { useState } from "react";

const Confirm = ({ searchData, isLoading, handleRegister }) => {
  return (
    <div
      className={`relative inset-0 bg-white p-8 rounded-lg shadow transition-opacity duration-300 flex flex-col sm:flex-row}`}
    >
      <div className="aspect-w-3 aspect-h-4 relative sm:w-1/3 mt-6">
        <img
          src={searchData.thumbnail || "/placeholder-book.png"}
          alt={searchData.title}
          className="object-cover w-1/2 sm:w-full h-full mx-auto"
          onError={(e) => {
            console.error("画像読み込みエラー:", e);
            e.target.src = "/placeholder-book.png";
          }}
        />
      </div>
      <div className="p-4 sm:w-2/3 flex flex-col justify-between">
        <h3 className="text-xl font-medium text-gray-900 mb-4 truncate">
          {searchData.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          著者: {searchData.authors?.join(", ") || "不明"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          出版社: {searchData.publisher || "不明"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          出版日: {searchData.publishedDate || "不明"}
        </p>
        <div className="mt-4">
          <button
          onClick={handleRegister}
          disabled={isLoading}
          className={`w-full mt-4 relative py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
            isLoading
              ? "bg-emerald-200 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              保存中...
            </div>
          ) : (
            "登録する"
          )}
        </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
