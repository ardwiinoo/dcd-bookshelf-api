const { nanoid } = require('nanoid');

class BookshelfHandler {
  constructor(bookshelfService) {
    this.bookshelfService = bookshelfService;
  }

  async getBookshelfHandler(request, h) {
    const { reading, finished, name } = request.query;

    if (reading) {
      if (reading === '1') {
        const readingBooks = await this.bookshelfService.getAllReadingBooks();
        return h
          .response({
            status: 'success',
            data: {
              books: readingBooks,
            },
          })
          .code(200);
      } else if (reading === '0') {
        const unReadingBooks =
          await this.bookshelfService.getAllUnreadingBooks();
        return h
          .response({
            status: 'success',
            data: {
              books: unReadingBooks,
            },
          })
          .code(200);
      }
    } else if (finished) {
      if (finished === '1') {
        const finishedBooks = await this.bookshelfService.getAllFinishedBooks();
        return h
          .response({
            status: 'success',
            data: {
              books: finishedBooks,
            },
          })
          .code(200);
      } else if (finished === '0') {
        const unFinishedBooks =
          await this.bookshelfService.getAllUnfinishedBooks();
        return h
          .response({
            status: 'success',
            data: {
              books: unFinishedBooks,
            },
          })
          .code(200);
      }
    } else if (name) {
      const containsDicodingNameBooks =
        await this.bookshelfService.getAllContainsDicodingNameBooks(name);

      return h
        .response({
          status: 'success',
          data: {
            books: containsDicodingNameBooks,
          },
        })
        .code(200);
    } else {
      const books = await this.bookshelfService.getAllBooks();

      return h
        .response({
          status: 'success',
          data: {
            books,
          },
        })
        .code(200);
    }
  }

  async postBookshelfHandler(request, h) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (!name || !name.trim()) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    const newBook = {
      id: nanoid(16),
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: readPage === pageCount,
      reading: reading || false,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const addedBook = await this.bookshelfService.addBook(newBook);

    if (!addedBook) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal ditambahkan',
        })
        .code(500);
    }

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: newBook.id,
        },
      })
      .code(201);
  }

  async getBookshelfByIdHandler(request, h) {
    const { bookId } = request.params;

    const book = await this.bookshelfService.getBookById(bookId);

    if (!book || book.length === 0) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
    }

    return h
      .response({
        status: 'success',
        data: {
          book: book[0],
        },
      })
      .code(200);
  }

  async updateBookshelfByIdHandler(request, h) {
    const { bookId } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    if (!name || !name.trim()) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    const updateBook = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: readPage === pageCount,
      reading,
      updatedAt: new Date().toISOString(),
    };

    const book = await this.bookshelfService.updateBook(bookId, updateBook);

    if (!book || book.length === 0) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
    }

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  }

  async deleteBookshelfByIdHandler(request, h) {
    const { bookId } = request.params;

    const book = await this.bookshelfService.deleteBook(bookId);

    if (!book || book.length === 0) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
    }

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  }
}

module.exports = BookshelfHandler;
