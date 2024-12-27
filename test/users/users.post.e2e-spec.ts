import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bootstrapNestApp } from 'test/helpers/bootstrap-nest-app.helper';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import {
  misingFirstName,
  missingEmail,
  missingPassword,
} from './users.post.e2e-spec.sample-data';
import { App } from 'supertest/types';
import * as request from 'supertest';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapNestApp();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer).post('/users').send(misingFirstName).expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it.todo('/users - Valid request successfully creates user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');
});
