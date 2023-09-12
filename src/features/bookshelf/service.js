const BookshelfRepository = require('./repository');

class BookshelfService {
  constructor(bookshelfRepository) {
    this.bookshelfRepository = bookshelfRepository;
  }

  async addBook(book) {
    const addedBook = await this.bookshelfRepository.addBook(book);
    return addedBook;
  }

  async getAllBooks() {
    return this.bookshelfRepository.getAllBooks();
  }

  async getBookById(bookId) {
    return this.bookshelfRepository.getBookById(bookId);
  }

  async updateBook(bookId, book) {
    return this.bookshelfRepository.updateBook(bookId, book);
  }

  async deleteBook(bookId) {
    return this.bookshelfRepository.deleteBook(bookId);
  }

  async getAllReadingBooks() {
    return this.bookshelfRepository.getAllReadingBooks();
  }

  async getAllUnreadingBooks() {
    return this.bookshelfRepository.getAllUnreadingBooks();
  }

  async getAllFinishedBooks() {
    return this.bookshelfRepository.getAllFinishedBooks();
  }

  async getAllUnfinishedBooks() {
    return this.bookshelfRepository.getAllUnfinishedBooks();
  }

  async getAllContainsDicodingNameBooks(name) {
    return this.bookshelfRepository.getAllContainsDicodingNameBooks(name);
  }
}

const createBookshelfService = () => {
  const bookshelfRepository = new BookshelfRepository();
  const bookshelfService = new BookshelfService(bookshelfRepository);
  return bookshelfService;
};

module.exports = createBookshelfService;
