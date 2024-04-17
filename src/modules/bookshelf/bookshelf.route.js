const bookshelfRoutes = (bookshelfHandler) => {
  return [
    {
      method: 'GET',
      path: '/books',
      handler: (request, h) => bookshelfHandler.getBookshelfHandler(request, h),
    },
    {
      method: 'POST',
      path: '/books',
      handler: (request, h) =>
        bookshelfHandler.postBookshelfHandler(request, h),
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: (request, h) =>
        bookshelfHandler.getBookshelfByIdHandler(request, h),
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: (request, h) =>
        bookshelfHandler.updateBookshelfByIdHandler(request, h),
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: (request, h) =>
        bookshelfHandler.deleteBookshelfByIdHandler(request, h),
    },
  ];
};

module.exports = bookshelfRoutes;
