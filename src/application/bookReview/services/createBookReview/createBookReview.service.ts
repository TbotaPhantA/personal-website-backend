import { Inject, Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../../shared/tokens';
import { BookReviewRepository } from '../../repositories/bookReviewRepository';
import { BookReviewFactory } from '../../factories/bookReview.factory';
import { ITransaction } from '../../shared/types/ITransaction';

@Injectable()
export class CreateBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
    private readonly bookReviewFactory: BookReviewFactory,
  ) {}

  public async createBookReview(
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): Promise<BookReviewOutputDto> {
    const review = await this.bookReviewFactory.create(dto, transaction);
    await this.repository.save(review, transaction);
    return BookReviewOutputDto.from(review);
  }
}
