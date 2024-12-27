import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

export function appCreate(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swagerConfig = new DocumentBuilder()
    .setTitle('NestJs Masterclass')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT Licence',
      'https://github.com/twbs/bootstrap/blob/main/LICENSE',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swagerConfig);

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appconfig.awsAccessKey'),
      secretAccessKey: configService.get('appconfig.awsSecretKey'),
    },
    region: configService.get('appconfig.awsRegion'),
  });

  app.enableCors();
  // app.useGlobalInterceptors(new DataResponseInterceptor());
}
