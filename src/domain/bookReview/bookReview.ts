import { BookReviewFormDto } from './shared/dto/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article } from '../article/article';

export class BookReview {
  private readonly id: string;
  private readonly article: Article;

  constructor(dto: BookReviewFormDto) {
    this.id = uuid();
    this.article = new Article(dto.article);
  }
}
