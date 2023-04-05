import { Body, Controller, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { UserService } from './user.service';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles';
import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';

@Controller('user')
@UseFilters(AllExceptionFilter)
@UseGuards(RolesGuard)
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @Roles(UserRoleEnum.VISITOR, UserRoleEnum.ADMIN)
  @ApiHeader({ name: 'authorization' })
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
