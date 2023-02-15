import { fail, Invariant, success } from '@derbent-ninjas/invariant-composer';
import { LANGUAGES_MUST_NOT_BE_REPEATED } from '../../../../../shared/errorMessages';
import { ArticleFormDto } from '../../dto/form/articleFormData.dto';

export function languagesMustNotBeRepeated(props: ArticleFormDto): Invariant {
  const [languagesArray, languagesSet] = arrayAndSet(props);

  return languagesArray.length === languagesSet.size
    ? success()
    : fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED });

  function arrayAndSet(props: ArticleFormDto): [Array<string>, Set<string>] {
    const languagesArray = [
      props.originalLanguageId,
      ...props.translations.map((t) => t.languageId),
    ];
    const languagesSet = new Set(languagesArray);

    return [languagesArray, languagesSet];
  }
}
