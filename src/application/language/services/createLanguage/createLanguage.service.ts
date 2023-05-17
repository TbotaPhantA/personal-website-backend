import { LanguageOutputDto } from '../../../../domain/language/shared/dto/output/languageOutput.dto';
import { LanguageFormDto } from '../../../../domain/language/shared/dto/form/languageForm.dto';
import { LanguageRepository } from '../../repositories/language.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../../shared/tokens';
import { LanguageFactory } from '../../factories/language.factory';
import { ITransaction } from '../../../bookReview/shared/types/ITransaction';
import * as TE from 'fp-ts/TaskEither';
import * as NEA from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/lib/function';
import { ErrorMessagesWithPath } from '../../../../shared/fp-ts-helpers/types/errorMessagesWithPath';

@Injectable()
export class CreateLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
    private readonly languageFactory: LanguageFactory,
  ) {}

  createLanguage(
    dto: LanguageFormDto,
    transaction: ITransaction
  ): TE.TaskEither<NEA.NonEmptyArray<ErrorMessagesWithPath>, LanguageOutputDto> {
    return pipe(
      this.languageFactory.create(dto, transaction),
      TE.chain(language => TE.fromTask(this.languageRepository.insert(language, transaction))),
      TE.map(language => LanguageOutputDto.from(language)),
    )
  }
}
