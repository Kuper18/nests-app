import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE_NAME || 'nestjs-blog',
  synchronize: process.env.DB_DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DB_DATABASE_AUTOLOAD === 'true' ? true : false,
}));
