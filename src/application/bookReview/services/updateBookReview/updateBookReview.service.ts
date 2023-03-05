import { Inject, Injectable } from '@nestjs/common';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from '../readBookReview.service';
import { assertCanUpdateBookReview } from '../../shared/utils/asserts/assertCanUpdateBookReview';
import { ITransaction } from '../../shared/types/ITransaction';
import { BOOK_REVIEW_REPOSITORY } from '../../shared/tokens';
import { BookReviewRepository } from '../../repositories/bookReviewRepository';
import { UpdatableBookReview } from '../../../../domain/bookReview/updatableBookReview';
import {
  ExtraBookReviewValidationProps
} from '../../../../domain/bookReview/shared/types/extraBookReviewValidationProps';

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
    const [review, validation] = await this.getReviewAndExtraValidationParams(id, dto, transaction);
    assertCanUpdateBookReview(review.canUpdate(dto, validation));
    const newReview = review.update(dto, validation);
    await this.repository.update(newReview, transaction);
    return BookReviewOutputDto.from(newReview);
  }

  private async getReviewAndExtraValidationParams(
    id: string,
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): Promise<[UpdatableBookReview, ExtraBookReviewValidationProps]> {
    return Promise.all([
      this.readBookReview.getById(id, transaction),
      this.readBookReview.getExtraValidationProps(dto, transaction),
    ]);
  }
}
