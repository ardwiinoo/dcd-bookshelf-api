const books = require('../../db');

class BookshelfStore {
  addBook(book) {
    books.push(book);
    return book;
  }

  getAllBooks() {
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  getBookById(bookId) {
    return books.filter((book) => book.id === bookId);
  }

  updateBook(bookId, book) {
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return null;
    }

    const updatedBook = {
      ...books[bookIndex],
      ...book,
    };

    books[bookIndex] = updatedBook;
    return books[bookIndex];
  }

  deleteBook(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return null;
    }

    return books.splice(bookIndex, 1);
  }

  getAllReadingBooks() {
    return books
      .filter((book) => book.reading === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  getAllUnreadingBooks() {
    return books
      .filter((book) => book.reading === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  getAllFinishedBooks() {
    return books
      .filter((book) => book.finished === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  getAllUnfinishedBooks() {
    return books
      .filter((book) => book.finished === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  getAllContainsDicodingNameBooks(name) {
    return books
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }
}

module.exports = BookshelfStore;
