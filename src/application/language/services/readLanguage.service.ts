import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageRepository } from '../repositories/language.repository';
import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';
import { ExtraLanguageValidationProps } from '../../../domain/language/shared/types/extraLanguageValidationProps';
import { AllLanguagesOutputDto } from '../../../domain/language/shared/dto/output/allLanguagesOutput.dto';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';

@Injectable()
export class ReadLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  getAll(): T.Task<AllLanguagesOutputDto> {
    return pipe(
      this.languageRepository.findAll(),
      T.map(languages => AllLanguagesOutputDto.from(languages))
    )
  }

  doLanguagesExist(languageIds: string[], transaction: ITransaction): T.Task<boolean> {
    return pipe(
      this.languageRepository.findManyByIds(languageIds, transaction),
      T.map(foundLanguages => foundLanguages.length === languageIds.length)
    )
  }

  getExtraLanguageValidationProps(
    dto: LanguageFormDto,
    transaction: ITransaction,
  ): T.Task<ExtraLanguageValidationProps> {
    return pipe(
      this.isLanguageIdUnique(dto.id, transaction),
      T.map(isIdUnique => ({ isIdUnique })),
    )
  }

  isLanguageIdUnique(languageId: string, transaction: ITransaction): T.Task<boolean> {
    return pipe(
      this.languageRepository.findById(languageId, transaction),
      T.map(foundLanguage => !foundLanguage)
    )
  }
}
