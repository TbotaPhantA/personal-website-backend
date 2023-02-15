import { ArticleFormDto } from './shared/dto/form/articleFormData.dto';
import { v4 as uuid } from 'uuid';
import { ArticleTranslation } from './articleTranslation/articleTranslation';
import { assert, compose, Invariant } from '@derbent-ninjas/invariant-composer';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';
import { allLanguageIdsMustExist } from './shared/utils/invariants/allLanguageIdsMustExist';

export interface ExtraArticleValidationProps {
  doLanguagesExist: boolean;
}

export class Article {
  readonly id: string;
  readonly originalLanguageId: string;
  readonly originalTitle: string;
  readonly originalContent: string;
  readonly translations: ArticleTranslation[];

  constructor(dto: ArticleFormDto, validation: ExtraArticleValidationProps) {
    assert(Article.name, Article.canCreate(dto, validation));
    this.id = uuid();
    this.originalLanguageId = dto.originalLanguageId;
    this.originalTitle = dto.originalTitle;
    this.originalContent = dto.originalContent;
    this.translations = dto.translations.map(
      (translation) =>
        new ArticleTranslation({ ...translation, articleId: this.id }),
    );
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Article>
  ): Invariant {
    const [props, validation] = params;

    return compose(
      languagesMustNotBeRepeated(props),
      allLanguageIdsMustExist(validation),
    );
  }
}
