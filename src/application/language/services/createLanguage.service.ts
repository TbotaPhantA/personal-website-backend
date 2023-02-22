import { LanguageOutputDto } from '../../../domain/language/shared/dto/output/languageOutput.dto';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { LanguageRepository } from '../repositories/language.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageFactory } from '../factories/language.factory';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';

@Injectable()
export class CreateLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
    private readonly languageFactory: LanguageFactory,
  ) {}

  async createLanguage(dto: LanguageFormDto, transaction: ITransaction): Promise<LanguageOutputDto> {
    const language = await this.languageFactory.create(dto, transaction);
    await this.languageRepository.save(language, transaction);
    return LanguageOutputDto.from(language);
  }
}
