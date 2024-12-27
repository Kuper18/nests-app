import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  entities: ['**/*.entity.js'],
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'nestjs-blog',
  migrations: ['migrations/*.js'],
});
