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
  private _id: string;
  public get id() { return this._id }
  private set id(id: string) { this._id = id }

  private _originalLanguageId: string;
  public get originalLanguageId() { return this._originalLanguageId }
  private set originalLanguageId(languageId: string) { this._originalLanguageId = languageId }

  private _originalTitle: string;
  public get originalTitle() { return this._originalTitle }
  private set originalTitle(title: string) { this._originalTitle = title }

  private _originalContent: string;
  public get originalContent() { return this._originalContent }
  private set originalContent(content: string) { this._originalContent = content }

  private _translations: ArticleTranslation[];
  public get translations() { return this._translations }
  private set translations(translations: ArticleTranslation[]) { this._translations = translations }

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
