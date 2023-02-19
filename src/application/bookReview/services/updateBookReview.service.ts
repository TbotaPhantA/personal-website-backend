import { Injectable } from '@nestjs/common';
import { BookReviewOutputDto } from '../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from './readBookReview.service';
import { assertCanUpdateBookReview } from '../shared/utils/asserts/assertCanUpdateBookReview';

@Injectable()
export class UpdateBookReviewService {
  constructor(private readonly readBookReview: ReadBookReviewService) {}

  async updateBookReview(
    id: string,
    dto: BookReviewFormDto,
  ): Promise<BookReviewOutputDto> {
    const review = await this.readBookReview.getById(id);
    const validation = await this.readBookReview.getExtraValidationProps(dto);
    assertCanUpdateBookReview(review.canUpdate(dto, validation));
    review.update(dto, validation);
    return BookReviewOutputDto.from(review);
  }
}
