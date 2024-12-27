import { SetMetadata } from '@nestjs/common';
import { AuthTypeEnum } from '../enums/auth-type.enum';
import { AUTH_TYPE_KYE } from '../constants/auth.constants';

export const Auth = (...args: AuthTypeEnum[]) =>
  SetMetadata(AUTH_TYPE_KYE, args);
