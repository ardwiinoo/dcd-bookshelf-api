const Hapi = require('@hapi/hapi');
const createBookshelfService = require('./features/bookshelf/service');
const bookshelfPlugin = require('./features/bookshelf');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const bookshelfService = createBookshelfService();

  await server.register([
    {
      plugin: bookshelfPlugin,
      options: { bookshelfService },
    },
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
