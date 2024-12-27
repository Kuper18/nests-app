import { registerAs } from '@nestjs/config';

export default registerAs('appconfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  mailHost: process.env.MAIL_HOST,
  mailPort: +process.env.MAIL_PORT,
  mailUserName: process.env.MAIL_USER_NAME,
  mailPassword: process.env.MAIL_PASSWORD,
}));
