import { Inject, Injectable } from '@nestjs/common';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from '../readBookReview.service';
import { assertCanUpdateBookReview } from '../../shared/utils/asserts/assertCanUpdateBookReview';
import { ITransaction } from '../../shared/types/ITransaction';
import { BOOK_REVIEW_REPOSITORY } from '../../shared/tokens';
import { BookReviewRepository } from '../../repositories/bookReviewRepository';

@Injectable()
export class UpdateBookReviewService {
  constructor(
    private readonly readBookReview: ReadBookReviewService,
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
  ) {}

  async updateBookReview(
    id: string,
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): Promise<BookReviewOutputDto> {
    const review = await this.readBookReview.getById(id, transaction);
    const validation = await this.readBookReview.getExtraValidationProps(dto, transaction);
    assertCanUpdateBookReview(review.canUpdate(dto, validation));
    review.update(dto, validation);
    await this.repository.save(review, transaction);
    return BookReviewOutputDto.from(review);
  }
}
