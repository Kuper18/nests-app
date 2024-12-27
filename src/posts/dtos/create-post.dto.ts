import {
  Length,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsNotEmpty,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  ValidateNested,
  MaxLength,
  IsInt,
} from 'class-validator';
import { PostType } from '../enums/post-type.enum';
import { Status } from '../enums/post-status.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the title',
    example: 'New post',
  })
  @IsString()
  @Length(4, 100)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values are: post, page, story, series',
  })
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({
    description: 'Example: slug-test',
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Icorrect slug' })
  slug: string;

  @ApiProperty({
    enum: Status,
    description: 'Possible values are: draft, sheduled, review, published',
  })
  @IsEnum(Status)
  status: Status;

  @ApiPropertyOptional({
    description: 'Content goes here.',
    example: 'Some content goes here.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Schema goes here.',
    example:
      '{"type":"object","properties":{"name":{"type":"string"},"age":{"type":"number"}},"required":["name"]}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Image URL goes here.',
    example: 'https://test.com/image-name',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date of published post.',
    example: '2024-12-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishedAt?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags goes here.',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The matavalue is json string',
          example: '{"name": "Test", "key": true }',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
