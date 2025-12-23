import React from "react";
import Input from "./Input";

const Form = ({ formData, errors, isLoading, handleInputChange, handleSearch }) => {
  return (
    <form className="space-y-4">
      <Input
        label="ISBNコード"
        value={formData.isbn}
        onChange={(e) => handleInputChange("isbn", e.target.value)}
        error={errors.isbn}
        placeholder="例: 9784774142042"
        required
      />

      <Input
        label="タイトル"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        error={errors.title}
        placeholder="例: リーダブルコード"
        required
      />

      <Input
        label="巻数"
        value={formData.number}
        onChange={(e) => handleInputChange("number", e.target.value)}
        error={errors.number}
        placeholder="例: 1"
        required
        type="number"
      />

      <div>
        <button
          onClick={handleSearch}
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
              送信中...
            </div>
          ) : (
            "検索する"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
