import { create } from "../services/booksService";

const useDB = () => {
    const createBook = async (bookData) => {
        try {
            const response = await create(bookData);
            console.log("Book created successfully:", response);
            return response;
        } catch (error) {
            console.error("Error creating book:", error);
            throw error;
        }
    };

    return { createBook };
};

export default useDB;