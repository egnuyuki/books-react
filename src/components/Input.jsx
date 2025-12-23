import React from "react";
import { AlertCircle } from 'lucide-react';
const Input = ({ label, value, onChange, error, placeholder, required, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition bg-white ${
          error 
            ? 'border-rose-300 focus:border-rose-500' 
            : 'border-gray-200 focus:border-emerald-500'
        }`}
      />
      {error && (
        <div className="flex items-center gap-1 mt-2 text-rose-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;