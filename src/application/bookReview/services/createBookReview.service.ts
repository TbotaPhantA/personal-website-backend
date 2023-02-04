import { Inject, Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../domain/bookReview/shared/dto/bookReviewOutput.dto';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { BOOK_REVIEW_REPOSITORY } from '../shared/tokens';
import { BookReviewRepository } from '../repositories/BookReviewRepository';

@Injectable()
export class CreateBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
  ) {}

  public async createBookReview(
    dto: BookReviewFormDto,
  ): Promise<BookReviewOutputDto> {
    const review = new BookReview(dto);
    await this.repository.save(review);
    return BookReviewOutputDto.from(review);
  }
}
