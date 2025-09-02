import { DataSource } from 'typeorm';
import './src/config/load-env';
import configuration from './src/config/configuration';

const config = configuration();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_URL,
  port: config.POSTGRES_DB_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: config.NODE_ENV === 'development',
});
