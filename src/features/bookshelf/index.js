const BookshelfHandler = require('./handler');
const routes = require('./routes');

const bookshelfPlugin = {
  name: 'features/bookshelf',
  register: async (server, options) => {
    const { bookshelfService } = options;
    const bookshelfHandler = new BookshelfHandler(bookshelfService);

    server.route(routes(bookshelfHandler));
  },
};

module.exports = bookshelfPlugin;
