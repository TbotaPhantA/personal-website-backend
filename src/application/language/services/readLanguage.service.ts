import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageRepository } from '../repositories/language.repository';
import { AllLanguagesOutputDto } from '../../../domain/language/shared/dto/output/allLanguagesOutput.dto';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';
import { ExtraLanguageValidationProps } from '../../../domain/language/shared/types/extraLanguageValidationProps';

@Injectable()
export class ReadLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  public async getAll(): Promise<AllLanguagesOutputDto> {
    const languages = await this.languageRepository.findAll()();
    return AllLanguagesOutputDto.from(languages);
  }

  public async doLanguagesExist(languageIds: string[], transaction: ITransaction): Promise<boolean> {
    const foundLanguages = await this.languageRepository.findManyByIds(languageIds, transaction)
    return foundLanguages.length === languageIds.length;
  }

  public async getExtraLanguageValidationProps(
    dto: LanguageFormDto,
    transaction: ITransaction,
  ): Promise<ExtraLanguageValidationProps> {
    const isIdUnique = await this.isLanguageIdUnique(dto.id, transaction);
    return { isIdUnique };
  }

  private async isLanguageIdUnique(languageId: string, transaction: ITransaction): Promise<boolean> {
    const foundLanguage = await this.languageRepository.findById(languageId, transaction);
    return !foundLanguage;
  }
}
