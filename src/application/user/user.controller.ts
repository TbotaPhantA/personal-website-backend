import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { UserService } from './user.service';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles';
import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { TranslatableValidateDto } from '../../shared/utils/translatableValidateDto';
import { FastifyRequest } from 'fastify';

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
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoleEnum.VISITOR, UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Login user' })
  @ApiHeader({ name: 'accept-language', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user was successfully logged in',
    type: LoginOutputDto,
  })
  async login(
    @Body() dto: LoginUserFormDto,
    @Req() request: FastifyRequest,
  ): Promise<LoginOutputDto> {
    return TranslatableValidateDto.run(async () => {
      return pipe(
        this.userService.login(dto),
        TE.getOrElse(err => { throw err }),
      )();
    }, LoginUserFormDto, dto, request);
  }
}
