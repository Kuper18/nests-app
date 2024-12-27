import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @Length(3, 256)
  name: string;

  @ApiProperty({
    description: 'Example: slug-test',
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Icorrect slug' })
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  imageUrl?: string;
}
