import { ulid } from 'ulid';
import { ArticleFormDto } from './shared/dto/form/articleFormData.dto';
import { ArticleTranslation } from './articleTranslation/articleTranslation';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';
import { allLanguageIdsMustExist } from './shared/utils/invariants/allLanguageIdsMustExist';
import { ExtraArticleValidationProps } from './shared/types/extraArticleValidationProps';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import * as E from 'fp-ts/Either';
import { InvariantError } from '../../shared/fp-ts-helpers/errors/invariantError';
import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Apply';
import { invariantErrorSemigroup } from '../../shared/fp-ts-helpers/invariantErrorSemigroup';

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

  static createByDto(dto: ArticleFormDto, validation: ExtraArticleValidationProps): E.Either<InvariantError, Article> {
    return pipe(
      Article.validate(dto, validation),
      E.map(() => Article.createInstance(dto, ulid()))
    )
  }

  updateByDto(dto: ArticleFormDto, validation: ExtraArticleValidationProps): E.Either<InvariantError, Article> {
    return pipe(
      Article.validate(dto, validation),
      E.map(() => Article.createInstance(dto, this.id))
    )
  }

  private static validate(dto: ArticleFormDto, validation: ExtraArticleValidationProps) {
    return A.sequenceT(E.getApplicativeValidation(invariantErrorSemigroup))(
      languagesMustNotBeRepeated(dto),
      allLanguageIdsMustExist(validation),
    )
  }

  private static createInstance(dto: ArticleFormDto, articleId: string) {
    return new Article({
      ...dto,
      id: articleId,
      translations: dto.translations.map(t => ArticleTranslation.createByDto({ ...t, articleId }))
    })
  }
}
