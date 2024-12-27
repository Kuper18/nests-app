import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'oleh.kuper.dev@gmail.com',
      subject: 'Welcome to the Nestjs',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
