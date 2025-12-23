import axios from 'axios';
/**
 * 書籍データを登録するAPI関数
 * @param {Object} bookData - 登録する書籍データ
 * @param {string} [bookData.isbnCode] - ISBNコード
 * @param {string} [bookData.title] - 書籍のタイトル
 * @param {number} [bookData.number] - 巻数
 * @param {string} [bookData.authors] - 著者名
 * @param {string} [bookData.publisher] - 出版社
 * @param {string} [bookData.publishedDate] - 出版日
 * @returns {Promise} - API呼び出しの結果
 */

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
// const apiKey = "AIzaSyDNIRp2-OYiZ2mI4qLFEtXbHDdA1mN2cm8";
export const searchByIsbn = async(isbn) => {
    if (!apiKey) {
        console.warn("Google Books API Key is missing in environment variables.");
        return null;
    }
    if (!isbn) {
        console.warn("ISBN code is required to search for a book.");
        return null;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.totalItems > 0) {
            const data = response.data.items[0].volumeInfo;
            console.log("Fetched book data:", data);
            return {
                title: data.title || "",
                authors: data.authors || [],
                publisher: data.publisher || "",
                publishedDate: data.publishedDate || "",
                thumbnail: data.imageLinks ? data.imageLinks.thumbnail : "",
            }
        } else {
            console.warn("No book found with the provided ISBN.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching book data from Google Books API:", error);
        throw error;
    }
}