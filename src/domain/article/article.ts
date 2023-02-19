import { ArticleFormDto } from './shared/dto/form/articleFormData.dto';
import { v4 as uuid } from 'uuid';
import { ArticleTranslation } from './articleTranslation/articleTranslation';
import { assert, compose, Invariant } from '@derbent-ninjas/invariant-composer';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';
import { allLanguageIdsMustExist } from './shared/utils/invariants/allLanguageIdsMustExist';

export interface ExtraArticleValidationProps {
  doLanguagesExist: boolean;
}

type ArticleFormParams = ConstructorParameters<typeof Article>;

export class Article {
  id: string;
  originalLanguageId: string;
  originalTitle: string;
  originalContent: string;
  translations: ArticleTranslation[];

  constructor(dto: ArticleFormDto, validation: ExtraArticleValidationProps) {
    assert(Article.name, Article.canCreate(dto, validation));
    this.id = uuid();
    this.assignDtoValues(dto);
  }

  public static canCreate(...params: ArticleFormParams): Invariant {
    return Article.validateArticleForm(...params);
  }

  public update(...params: ArticleFormParams): void {
    const [dto] = params;
    assert(Article.name, this.canUpdate(...params));
    this.assignDtoValues(dto);
  }

  public canUpdate(...params: ArticleFormParams): Invariant {
    return Article.validateArticleForm(...params);
  }

  private static validateArticleForm(...params: ArticleFormParams): Invariant {
    const [props, validation] = params;

    return compose(
      languagesMustNotBeRepeated(props),
      allLanguageIdsMustExist(validation),
    );
  }

  private assignDtoValues(dto: ArticleFormDto): void {
    this.originalLanguageId = dto.originalLanguageId;
    this.originalTitle = dto.originalTitle;
    this.originalContent = dto.originalContent;
    this.translations = dto.translations.map(
      (translation) =>
        new ArticleTranslation({ ...translation, articleId: this.id }),
    );
  }
}
