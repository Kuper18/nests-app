import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SigningDto } from './dtos/signing.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthTypeEnum } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signing')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthTypeEnum.None)
  public async signing(@Body() signingDto: SigningDto) {
    return await this.authService.signIn(signingDto);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthTypeEnum.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto);
  }
}
