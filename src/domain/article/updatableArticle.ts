import { Article } from './article';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { CreateArticleByDtoParams } from './shared/types/createArticleByDtoParams';
import { assert, Invariant } from '@derbent-ninjas/invariant-composer';

export class UpdatableArticle extends Article {
  constructor(article: WithoutMethods<Article>) {
    super(article);
  }

  public update(...[dto, validation]: CreateArticleByDtoParams): Article {
    assert(Article.name, this.canUpdate(dto, validation));
    const articleId = this.id;
    return Article.createInstanceByDtoAndId(dto, articleId);
  }

  public canUpdate(...params: CreateArticleByDtoParams): Invariant {
    return Article.validateArticleForm(...params);
  }
}
