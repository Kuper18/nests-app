import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    let existingUser;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
        { description: error.message },
      );
    }

    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    try {
      const newUser = await this.userRepository.save(
        this.userRepository.create({
          ...createUserDto,
          password: await this.hashingProvider.hashPassword(
            createUserDto.password,
          ),
        }),
      );

      try {
        await this.mailService.sendEmail(newUser);
      } catch (error) {
        throw new RequestTimeoutException(error.message);
      }

      return newUser;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
        { description: error.message },
      );
    }
  }
}
