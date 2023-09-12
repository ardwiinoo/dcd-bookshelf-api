const books = require('../../data');

class BookshelfRepository {
  async addBook(book) {
    books.push(book);
    return book;
  }

  async getAllBooks() {
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  async getBookById(bookId) {
    return books.filter((book) => book.id === bookId);
  }

  async updateBook(bookId, book) {
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

  async deleteBook(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
      return null;
    }

    return books.splice(bookIndex, 1);
  }

  async getAllReadingBooks() {
    return books
      .filter((book) => book.reading === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  async getAllUnreadingBooks() {
    return books
      .filter((book) => book.reading === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  async getAllFinishedBooks() {
    return books
      .filter((book) => book.finished === true)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  async getAllUnfinishedBooks() {
    return books
      .filter((book) => book.finished === false)
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }

  async getAllContainsDicodingNameBooks(name) {
    return books
      .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      .map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }));
  }
}

module.exports = BookshelfRepository;
