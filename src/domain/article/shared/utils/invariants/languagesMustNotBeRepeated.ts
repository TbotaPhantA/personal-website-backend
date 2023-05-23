import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';
import { ArticleFormDto } from '../../dto/form/articleFormData.dto';
import * as E from 'fp-ts/Either';
import { InvariantError } from '../../../../../shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../../shared/fp-ts-helpers/utils/createInvariantError';

export function languagesMustNotBeRepeated(props: ArticleFormDto): E.Either<InvariantError, ArticleFormDto> {
  const [languagesArray, languagesSet] = arrayAndSet(props);

  return languagesArray.length === languagesSet.size
    ? E.right(props)
    : E.left(createInvariantError(ERROR_CODES.LANGUAGES_MUST_NOT_BE_REPEATED))

  function arrayAndSet(props: ArticleFormDto): [Array<string>, Set<string>] {
    const languagesArray = [
      props.originalLanguageId,
      ...props.translations.map((t) => t.languageId),
    ];
    const languagesSet = new Set(languagesArray);

    return [languagesArray, languagesSet];
  }
}
