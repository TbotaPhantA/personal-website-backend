import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageFormDto } from '../../domain/language/shared/dto/languageForm.dto';
import { CreateLanguageService } from './services/createLanguage.service';
import { LanguageOutputDto } from '../../domain/language/shared/dto/languageOutput.dto';
import { AllLanguagesOutputDto } from '../../domain/language/shared/dto/allLanguagesOutput.dto';
import { GetLanguageService } from './services/getLanguage.service';

@Controller('language')
@ApiTags('language')
export class LanguageController {
  constructor(
    private readonly getLanguageService: GetLanguageService,
    private readonly createLanguageService: CreateLanguageService,
  ) {}

  @Get('all-languages')
  @ApiOperation({ summary: 'get all languages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'all languages were received',
    type: AllLanguagesOutputDto,
  })
  async getAllLanguages(): Promise<AllLanguagesOutputDto> {
    return this.getLanguageService.getAll();
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
    return this.createLanguageService.createLanguage(dto);
  }
}
