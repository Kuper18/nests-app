import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { appCreate } from 'src/app.create';
import { AppModule } from 'src/app.module';

export async function bootstrapNestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ConfigModule],
    providers: [ConfigService],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  appCreate(app);
  await app.init();

  return app;
}
