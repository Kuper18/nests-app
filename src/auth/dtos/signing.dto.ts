import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigningDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
