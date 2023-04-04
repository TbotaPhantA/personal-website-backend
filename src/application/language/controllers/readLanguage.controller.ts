import { Controller, Get, HttpStatus, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllLanguagesOutputDto } from 'src/domain/language/shared/dto/output/allLanguagesOutput.dto';
import { AllExceptionFilter } from 'src/shared/exceptionFilters/allErrors.filter';
import { ReadLanguageService } from '../services/readLanguage.service';

@Controller('language')
@UseFilters(AllExceptionFilter)
@ApiTags('language')
export class ReadLanguageController {
  constructor(
    private readonly readService: ReadLanguageService,
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
}