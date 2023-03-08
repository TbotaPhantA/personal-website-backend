import { assert, compose, Invariant } from '@derbent-ninjas/invariant-composer';
import { ulid } from 'ulid';
import { ArticleFormDto } from './shared/dto/form/articleFormData.dto';
import { ArticleTranslation } from './articleTranslation/articleTranslation';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';
import { allLanguageIdsMustExist } from './shared/utils/invariants/allLanguageIdsMustExist';
import { CreateArticleByDtoParams } from './shared/types/createArticleByDtoParams';
import { ExtraArticleValidationProps } from './shared/types/extraArticleValidationProps';
import { WithoutMethods } from '../../shared/types/withoutMethods';

export class Article {
  readonly id: string;
  readonly originalLanguageId: string;
  readonly originalTitle: string;
  readonly originalContent: string;
  readonly translations: ArticleTranslation[];

  constructor(article: WithoutMethods<Article>) {
    this.id = article.id;
    this.originalLanguageId = article.originalLanguageId;
    this.originalTitle = article.originalTitle;
    this.originalContent = article.originalContent;
    this.translations = article.translations;
  }

  public static createByDto(dto: ArticleFormDto, validation: ExtraArticleValidationProps): Article {
    assert(Article.name, Article.canCreateByDto(dto, validation));
    const articleId = ulid();
    return Article.createInstanceByDtoAndId(dto, articleId);
  }

  public static canCreateByDto(...params: CreateArticleByDtoParams): Invariant {
    return Article.validateArticleForm(...params);
  }

  protected static validateArticleForm(...params: CreateArticleByDtoParams): Invariant {
    const [props, validation] = params;

    return compose(
      languagesMustNotBeRepeated(props),
      allLanguageIdsMustExist(validation),
    );
  }

  protected static createInstanceByDtoAndId(dto: ArticleFormDto, articleId: string) {
    return new Article({
      ...dto,
      id: articleId,
      translations: dto.translations.map(t => ArticleTranslation.createByDto({ ...t, articleId }))
    });
  }
}
