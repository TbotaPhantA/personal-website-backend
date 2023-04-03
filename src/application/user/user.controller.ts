import { Body, Controller, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { LoginOutsideDto } from '../../domain/user/shared/dto/output/loginOutsideDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';

@Controller('user')
@UseFilters(AllExceptionFilter)
@ApiTags('user')
export class UserController {
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user was successfully logged in',
    type: LoginOutsideDto,
  })
  async login(@Body() dto: LoginUserFormDto): Promise<LoginOutsideDto> {
    return {
      accessToken: 'token',
    }
  }
}
