import { LanguageOutputDto } from '../../../domain/language/shared/dto/output/languageOutput.dto';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { Language } from '../../../domain/language/language';
import { LanguageRepository } from '../repositories/language.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';

@Injectable()
export class CreateLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  async createLanguage(dto: LanguageFormDto): Promise<LanguageOutputDto> {
    const language = new Language(dto);
    await this.languageRepository.save(language);
    return LanguageOutputDto.from(language);
  }
}
