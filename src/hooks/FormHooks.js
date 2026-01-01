import React from "react";
import { useState } from "react";
import { searchByIsbn } from "../services/googleBooksService";
import { checkDuplicateByIsbn } from "../services/booksService";

const useForm = () => {
    const [formData, setFormData] = useState({
        isbn: "",
        title: "",
        number: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [searchError, setSearchError] = useState(null);

    // バリデーション
    const validateForm = () => {
        const newErrors = {};

        // ISBNコードのバリデーション（10桁または13桁の数字）
        if (!formData.isbn.trim()) {
            newErrors.isbn = "ISBNコードを入力してください";
        } else if (!/^\d{10}$|^\d{13}$/.test(formData.isbn.trim())) {
            newErrors.isbn = "ISBNコードは10桁または13桁の数字で入力してください";
        }

        // タイトルのバリデーション
        if (!formData.title.trim()) {
            newErrors.title = "タイトルを入力してください";
        } else if (formData.title.trim().length < 1) {
            newErrors.title = "タイトルは1文字以上で入力してください";
        }

        // 巻数のバリデーション
        if (!formData.number) {
            newErrors.number = "巻数を入力してください";
        } else if (!/^\d+$/.test(formData.number)) {
            newErrors.number = "巻数は数字で入力してください";
        } else if (parseInt(formData.number) < 1) {
            newErrors.number = "巻数は1以上の数字で入力してください";
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // エラーをクリア
        if (formErrors[field]) {
            setFormErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        setSearchError(null);
        try {
            // 重複チェックもここで行う
            const isDuplicate = await checkDuplicateByIsbn(formData.isbn);
            if (isDuplicate) {
                setSearchError("このISBNコードの本は既に登録されています。");
                setSearchData(null);
                setIsLoading(false);
                return;
            }
            const result = await searchByIsbn(formData.isbn);
            setSearchData(result);
        } catch (error) {
            setSearchError("検索中にエラーが発生しました: " + error.message);
            console.error("検索中にエラーが発生しました:", error);
        }
        setIsLoading(false);
    };

    return {
        formData,
        formErrors,
        isLoading,
        searchData,
        searchError,
        setSearchData,
        handleInputChange,
        handleSearch,
    };
}

export default useForm;