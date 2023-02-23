import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageFormDto } from '../../domain/language/shared/dto/form/languageForm.dto';
import { LanguageOutputDto } from '../../domain/language/shared/dto/output/languageOutput.dto';
import { AllLanguagesOutputDto } from '../../domain/language/shared/dto/output/allLanguagesOutput.dto';
import { ReadLanguageService } from './services/readLanguage.service';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { CreateLanguageTransaction } from './services/createLanguage/createLanguage.transaction';

@Controller('language')
@UseFilters(AllExceptionFilter)
@ApiTags('language')
export class LanguageController {
  constructor(
    private readonly readService: ReadLanguageService,
    private readonly createLanguageTransaction: CreateLanguageTransaction,
  ) {}

  @Get('all')
  @ApiOperation({ summary: 'get all languages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'all languages were received',
    type: AllLanguagesOutputDto,
  })
  async getAllLanguages(): Promise<AllLanguagesOutputDto> {
    return this.readService.getAll();
  }

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
