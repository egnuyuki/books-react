import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import useForm from "../hooks/FormHooks";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const { searchData, setSearchData } = useForm();
  const [error, setError] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold">書籍登録</h2>
        {searchData ? (
          <button
            onClick={() => {
              setSearchData(null);
              setError(null);
            }}
            className="ml-auto px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            戻る
          </button>
        ) : (
          <div></div>
        )}
      </div>
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {searchData ? (
        <Confirm searchData={searchData} />
      ) : (
        <Form setSearchData={setSearchData} />
      )}
    </div>
  );
};

export default Register;
