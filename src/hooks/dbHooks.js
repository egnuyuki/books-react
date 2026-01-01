import { create } from "../services/booksService";
import { useState } from "react";
import { useNavigate } from "react-router";

const useDB = () => {
    const [bookData, setbookData] = useState({
        isbn_code: "",
        number: "",
        title: "",
        authors: "",
        publisher: "",
        published_date: "",
        cover_url: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async () => {
        setIsLoading(true);
        try {
            await create(bookData);
            // listページに遷移
            navigate("/list");
        } catch (error) {
            setError(error.message || "本の登録に失敗しました");
            console.error("Error registering book:", error);
        }
        setIsLoading(false);
    };


    return { 
        bookData, 
        setbookData, 
        error, 
        isLoading,
        handleRegister
    };
};

export default useDB;