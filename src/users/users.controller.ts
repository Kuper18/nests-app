import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthTypeEnum } from 'src/auth/enums/auth-type.enum';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetch a list of registered users.',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully.',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query.',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The number of page.',
    example: 1,
  })
  public getUsers() {
    // @Query('page', new DefaultValuePipe(5), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getUserParamDto: GetUserParamDto,
    return this.usersService.findAll();
  }

  @Post()
  // @SetMetadata('authType', 'none')
  @Auth(AuthTypeEnum.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUsers(@Body() сreateUserDto: CreateUserDto) {
    return await this.usersService.createUser(сreateUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public async createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return await this.usersService.createMany(createManyUsersDto);
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);

    return 'User is updated.';
  }
}
