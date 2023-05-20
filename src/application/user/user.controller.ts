import { Body, Controller, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { UserService } from './user.service';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles';
import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

@Controller('user')
@UseFilters(AllExceptionFilter)
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @Roles(UserRoleEnum.VISITOR, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user was successfully logged in',
    type: LoginOutputDto,
  })
  async login(@Body() dto: LoginUserFormDto): Promise<LoginOutputDto> {
    return pipe(
      this.userService.login(dto),
      TE.getOrElse(err => { throw err }),
    )();
  }
}
