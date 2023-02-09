import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article } from '../article/article';
import { Invariant, success } from '@derbent-ninjas/invariant-composer';

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(dto: BookReviewFormDto) {
    this.id = uuid();
    this.article = new Article(dto.article);
  }

  public static canCreate(dto: BookReviewFormDto): Invariant {
    return success();
  }
}
