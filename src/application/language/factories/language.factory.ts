import { LanguageFormDto } from '../../../domain/language/shared/dto/form/languageForm.dto';
import { Language } from '../../../domain/language/language';
import { ReadLanguageService } from '../services/readLanguage.service';
import { Injectable } from '@nestjs/common';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import { pathE } from '../../../shared/fp-ts-helpers/utils/pathE';
import { InvariantError } from '../../../shared/fp-ts-helpers/errors/invariantError';

@Injectable()
export class LanguageFactory {
  constructor(private readonly readLanguage: ReadLanguageService) {}

  create(dto: LanguageFormDto, transaction: ITransaction): TE.TaskEither<InvariantError, Language> {
    return pipe(
      TE.fromTask(this.readLanguage.getExtraLanguageValidationProps(dto, transaction)),
      TE.chainEitherK((validation) => pathE('language', Language.createByDto(dto, validation)))
    )
  }
}
