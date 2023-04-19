import * as Hapi from '@hapi/hapi';
import { routes } from './routes/routes';
import { AppDataSource } from './db';
import plugins from './db/regPlugins';

export const startServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '192.168.1.68',
  });

  // Подключение к БД
  AppDataSource.initialize().then(async () => {
    await AppDataSource.runMigrations();
    console.log('Подключено к БД');
  });

  // Регистрирование плагинов
  await server.register(plugins);

  // Роуты
  server.route(routes);

  // Запуск сервера
  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
