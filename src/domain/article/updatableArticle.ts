import { Article } from './article';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { CreateArticleByDtoParams } from './shared/types/createArticleByDtoParams';
import { assert, Invariant } from '@derbent-ninjas/invariant-composer';

export class UpdatableArticle extends Article {
  constructor(article: WithoutMethods<Article>) {
    super(article);
  }

  update(...[dto, validation]: CreateArticleByDtoParams): UpdatableArticle {
    assert(Article.name, this.canUpdate(dto, validation));
    const articleId = this.id;
    return new UpdatableArticle(Article.createInstanceByDtoAndId(dto, articleId));
  }

  canUpdate(...params: CreateArticleByDtoParams): Invariant {
    return Article.validateArticleForm(...params);
  }
}
