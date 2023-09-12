const routes = (handler) => {
  return [
    {
      method: 'GET',
      path: '/books',
      handler: (request, h) => handler.getBookshelfHandler(request, h),
    },
    {
      method: 'POST',
      path: '/books',
      handler: (request, h) => handler.postBookshelfHandler(request, h),
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: (request, h) => handler.getBookshelfByIdHandler(request, h),
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: (request, h) => handler.updateBookshelfByIdHandler(request, h),
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: (request, h) => handler.deleteBookshelfByIdHandler(request, h),
    },
  ];
};

module.exports = routes;
