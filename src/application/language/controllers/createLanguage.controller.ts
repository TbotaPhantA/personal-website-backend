import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { LanguageOutputDto } from '../../../domain/language/shared/dto/output/languageOutput.dto';
import { AllExceptionFilter } from '../../../shared/exceptionFilters/allErrors.filter';
import { CreateLanguageTransaction } from '../services/createLanguage/createLanguage.transaction';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles';
import { UserRoleEnum } from '../../../domain/user/shared/enums/userRole.enum';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { TranslatableValidateDto } from '../../../shared/utils/translatableValidateDto';
import { FastifyRequest } from 'fastify';

@Controller('language')
@UseFilters(AllExceptionFilter)
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('language')
export class CreateLanguageController {
  constructor(
    private readonly createLanguageTransaction: CreateLanguageTransaction,
  ) { }

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create new language' })
  @ApiHeader({ name: 'accept-language', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New language was successfully created',
    type: LanguageOutputDto,
  })
  async createLanguage(
    @Body() dto: LanguageFormDto,
    @Req() request: FastifyRequest,
  ): Promise<LanguageOutputDto> {
    return TranslatableValidateDto.run(async () => {
      return pipe(
        await this.createLanguageTransaction.run(dto),
        E.getOrElseW(err => { throw err }),
      )
    }, LanguageFormDto, dto, request);
  }
}
