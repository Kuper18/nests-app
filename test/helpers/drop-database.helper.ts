import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: config.get('database.synchronize'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.database'),
  });

  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
}
