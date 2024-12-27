import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SigningDto } from '../dtos/signing.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersSrevive: UsersService,

    private readonly signinProvider: SignInProvider,

    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  public async signIn(signingDto: SigningDto) {
    return await this.signinProvider.signIn(signingDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
