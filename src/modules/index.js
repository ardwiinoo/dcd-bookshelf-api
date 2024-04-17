const BookshelfHandler = require('./bookshelf/bookshelf.handler');
const bookshelfRoutes = require('./bookshelf/bookshelf.route');
const BookshelfStore = require('./bookshelf/bookshelf.store');

// provide bookshelf
const bookshelfStore = new BookshelfStore();

const bookshelfPlugin = {
  name: 'module/bookshelf',
  register: async (server, options) => {
    const bookshelfHandler = new BookshelfHandler(bookshelfStore);

    server.route(bookshelfRoutes(bookshelfHandler));
  },
};

// export plugin
const plugins = [bookshelfPlugin];

module.exports = plugins;
