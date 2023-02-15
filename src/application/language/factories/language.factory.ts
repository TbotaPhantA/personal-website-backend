import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { Language } from '../../../domain/language/language';
import { assertCanCreateLanguage } from '../shared/utils/asserts/assertCanCreateLanguage';
import { ReadLanguageService } from '../services/readLanguage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguageFactory {
  constructor(private readonly readLanguage: ReadLanguageService) {}

  async create(dto: LanguageFormDto) {
    const validation = await this.readLanguage.getExtraLanguageValidationProps(
      dto,
    );
    const canCreate = Language.canCreate(dto, validation);
    assertCanCreateLanguage(canCreate);
    return new Language(dto, validation);
  }
}
