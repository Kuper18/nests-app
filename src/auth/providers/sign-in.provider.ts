import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigningDto } from '../dtos/signing.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signingDto: SigningDto) {
    const user = await this.usersService.findOneByEmail(signingDto.email);
    let isEquel = false;

    try {
      isEquel = await this.hashingProvider.comparePassword(
        signingDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwirds.',
      });
    }

    if (!isEquel) {
      throw new BadRequestException('Incorrect password.');
    }

    try {
      return await this.generateTokensProvider.generateTokens(user);
    } catch {
      throw new BadRequestException('Could not generate token.');
    }
  }
}
