import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GoogleUser } from '../interfaces/google-user.interface';
import { User } from '../user.entity';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';

@Injectable()
export class UsersService {
  constructor(
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // private readonly configService: ConfigService,

    // @Inject(profileConfig.KEY)
    // private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly dataSource: DataSource,

    private readonly usersCreateManyProvide: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneByEmailProvider: FindOneByEmailProvider,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUserProvider.createUser(createUserDto);
  }

  public async findAll() {
    // console.log(this.profileConfiguration);

    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The API endpoint does not exists.',
        filename: 'users.services.ts',
        lineNumber: 74,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'API endpoint not found.',
      },
    );
  }

  public async findOneById(id: number) {
    let user;

    try {
      user = await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment.',
        { description: error.message },
      );
    }

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvide.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneByEmailProvider.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
