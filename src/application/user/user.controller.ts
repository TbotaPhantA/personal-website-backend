import { Body, Controller, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(AllExceptionFilter)
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user was successfully logged in',
    type: LoginOutputDto,
  })
  async login(@Body() dto: LoginUserFormDto): Promise<LoginOutputDto> {
    return this.userService.login(dto);
  }
}
