import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Confirm from "../components/Confirm";
import useForm from "../hooks/FormHooks";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    formData,
    formErrors,
    isLoading,
    handleInputChange,
    handleSearch,
    searchData,
    setSearchData,
    searchError
  } = useForm();

  const [error, setError] = useState(searchError);

  useEffect(() => {
    setError(searchError);
  }, [searchError]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-xl text-yellow-400 font-bold">書籍登録</h2>
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
          <div />
        )}
      </div>
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {searchData ? (
        <Confirm
          searchData={searchData}
          formData={formData}
        />
      ) : (
        <Form
          formData={formData}
          formErrors={formErrors}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          searchError={searchError}
        />
      )}
    </div>
  );
};

export default Register;
