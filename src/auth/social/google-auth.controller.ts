import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './providers/google-auth.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthTypeEnum } from '../enums/auth-type.enum';

@Auth(AuthTypeEnum.None)
@Controller('/auth/google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Post()
  public async authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    const result = await this.googleAuthService.authenticate(googleTokenDto);
    console.log(result);
    return result;
  }
}
