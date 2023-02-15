import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageRepository } from '../repositories/language.repository';
import { AllLanguagesOutputDto } from '../../../domain/language/shared/dto/output/allLanguagesOutput.dto';
import { ExtraLanguageValidationProps } from '../../../domain/language/language';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';

@Injectable()
export class ReadLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  public async getAll(): Promise<AllLanguagesOutputDto> {
    const languages = await this.languageRepository.findAll();
    return AllLanguagesOutputDto.from(languages);
  }

  public async doLanguagesExist(languages: string[]): Promise<boolean> {
    return this.languageRepository.doLanguagesExist(languages);
  }

  public async getExtraLanguageValidationProps(
    dto: LanguageFormDto,
  ): Promise<ExtraLanguageValidationProps> {
    const isIdUnique = await this.languageRepository.isLanguageIdUnique(dto.id);
    return { isIdUnique };
  }
}
