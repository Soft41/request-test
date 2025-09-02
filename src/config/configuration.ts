export default () => ({
  NODE_ENV: (process.env.NODE_ENV ?? 'development') as
    | 'development'
    | 'production'
    | 'test',
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_DB_PORT: Number(process.env.POSTGRES_DB_PORT),
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  RABBITMQ_USER: process.env.RABBITMQ_USER,
  RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
  RABBITMQ_HOST: process.env.RABBITMQ_HOST,
  RABBITMQ_PORT: Number(process.env.RABBITMQ_PORT),
  RABBITMQ_MANAGEMENT_PORT: Number(process.env.RABBITMQ_MANAGEMENT_PORT),
  RABBITMQ_URL: process.env.RABBITMQ_URL,
});
