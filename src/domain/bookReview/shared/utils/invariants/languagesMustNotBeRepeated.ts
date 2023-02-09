import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { LANGUAGES_MUST_NOT_BE_REPEATED } from '../../../../../shared/errorMessages';
import { BookReview } from '../../../bookReview';

export function languagesMustNotBeRepeated(
  ...params: ConstructorParameters<typeof BookReview>
): Invariant {
  const [languagesArray, languagesSet] = arrayAndSet(...params);

  return languagesArray.length === languagesSet.size
    ? success()
    : fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED });

  function arrayAndSet(
    ...params: ConstructorParameters<typeof BookReview>
  ): [Array<string>, Set<string>] {
    const [props] = params;

    const languagesArray = [
      props.article.originalLanguageId,
      ...props.article.translations.map((t) => t.languageId),
    ];
    const languagesSet = new Set(languagesArray);

    return [languagesArray, languagesSet];
  }
}
