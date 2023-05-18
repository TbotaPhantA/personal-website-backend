import {
  Body,
  Controller,
  HttpStatus,
  Post,
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
import { InvariantException } from '../../../shared/errors/invariantException';
import { CANNOT_CREATE_LANGUAGE } from '../../../shared/errorMessages';

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
  @ApiHeader({ name: 'authorization' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New language was successfully created',
    type: LanguageOutputDto,
  })
  async createLanguage(
    @Body() dto: LanguageFormDto,
  ): Promise<LanguageOutputDto> {
    const res = await this.createLanguageTransaction.run(dto);

    if (E.isLeft(res)) {
      throw new InvariantException(
        CANNOT_CREATE_LANGUAGE,
        HttpStatus.BAD_REQUEST,
        res.left.invariantErrors.map(e => ({ path: e.path, messages: e.messages })),
      )
    } else {
      return res.right;
    }
  }
}
