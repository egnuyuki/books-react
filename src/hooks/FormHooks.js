import React from "react";
import { useState } from "react";

const useForm = () => {
    const [formData, setFormData] = useState({
        isbn: "",
        title: "",
        number: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // エラーをクリア
        if (errors[field]) {
            setErrors((prev) => ({
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
        // ここでAPI呼び出しなどの検索処理を実行
        // 例: await api.searchBook(formData);
        setIsLoading(false);
        console.log("検索処理を実行", formData);
    };

    return {
        formData,
        errors,
        isLoading,
        searchData,
        setSearchData,
        handleInputChange,
        handleSearch,
    };
}

export default useForm;