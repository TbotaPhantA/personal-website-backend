import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LanguageFormDto } from '../../domain/language/shared/dto/languageForm.dto';
import { CreateLanguageService } from './services/createLanguage.service';
import { LanguageOutputDto } from '../../domain/language/shared/dto/languageOutput.dto';

@Controller('language')
@ApiTags('language')
export class LanguageController {
  constructor(private readonly createLanguageService: CreateLanguageService) {}

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
