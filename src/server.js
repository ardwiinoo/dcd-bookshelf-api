const Hapi = require('@hapi/hapi');
const plugins = require('./modules');

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

  await server.register(plugins);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
