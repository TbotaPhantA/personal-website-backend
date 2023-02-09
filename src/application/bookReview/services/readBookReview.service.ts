import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line max-len
import { AllBookReviewsOutputDto } from '../../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../shared/tokens';
import { BookReviewRepository } from '../repositories/bookReviewRepository';

@Injectable()
export class ReadBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
  ) {}

  public async getAll(): Promise<AllBookReviewsOutputDto> {
    const reviews = await this.repository.getAll();
    return AllBookReviewsOutputDto.from(reviews);
  }
}
