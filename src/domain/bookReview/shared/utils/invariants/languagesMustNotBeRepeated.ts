import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { LANGUAGES_MUST_NOT_BE_REPEATED } from '../../../../../shared/errorMessages';
import { BookReviewFormDto } from '../../dto/form/bookReviewForm.dto';

export function languagesMustNotBeRepeated(
  props: BookReviewFormDto,
): Invariant {
  const [languagesArray, languagesSet] = arrayAndSet(props);

  return languagesArray.length === languagesSet.size
    ? success()
    : fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED });

  function arrayAndSet(props: BookReviewFormDto): [Array<string>, Set<string>] {
    const languagesArray = [
      props.article.originalLanguageId,
      ...props.article.translations.map((t) => t.languageId),
    ];
    const languagesSet = new Set(languagesArray);

    return [languagesArray, languagesSet];
  }
}
