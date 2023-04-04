import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { LanguageOutputDto } from '../../../domain/language/shared/dto/output/languageOutput.dto';
import { AllExceptionFilter } from '../../../shared/exceptionFilters/allErrors.filter';
import { CreateLanguageTransaction } from '../services/createLanguage/createLanguage.transaction';

@Controller('language')
@UseFilters(AllExceptionFilter)
@ApiTags('language')
export class CreateLanguageController {
  constructor(
    private readonly createLanguageTransaction: CreateLanguageTransaction,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create new language' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New language was successfully created',
    type: LanguageOutputDto,
  })
  async createLanguage(
    @Body() dto: LanguageFormDto,
  ): Promise<LanguageOutputDto> {
    return this.createLanguageTransaction.run(dto);
  }
}
