import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    let user = null;

    try {
      user = await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new RequestTimeoutException(
        'Could not connect to the database at the moment.',
        { description: error },
      );
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
