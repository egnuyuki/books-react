import {supabase} from '../lib/supabaseClient.js';

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
export const create = async(bookData) => {
    console.log("Creating book with data:", bookData);
  const { data, error } = await supabase
    .from('books')
    .insert([bookData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * 書籍データを取得するAPI関数
 * @returns {Promise} - API呼び出しの結果
 */
export const list = async() => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * 書籍データを削除するAPI関数
 * @param {string} isbn - 削除する書籍データのISBNコード
 * @returns {Promise} - API呼び出しの結果
 */
export const remove = async(isbn) => {
    const { data, error } = await supabase
        .from('books')
        .delete()
        .eq('isbn_code', isbn);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * isbnコードで書籍データの重複をチェックするAPI関数
 * @param {string} isbn - 更新する書籍データのISBNコード
 * @returns {Promise} - API呼び出しの結果
 */
export const checkDuplicateByIsbn = async(isbn) => {
    const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('isbn_code', isbn);

    if (error) {
        throw new Error(error.message);
    }

    return data.length > 0;
}