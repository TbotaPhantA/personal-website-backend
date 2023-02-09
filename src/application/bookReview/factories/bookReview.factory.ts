import { Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { assertCanCreateBookReview } from '../shared/utils/asserts/assertCanCreateBookReview';
import { BookReview } from '../../../domain/bookReview/bookReview';

@Injectable()
export class BookReviewFactory {
  public async create(dto: BookReviewFormDto): Promise<BookReviewOutputDto> {
    const canCreate = BookReview.canCreate(dto);
    assertCanCreateBookReview(canCreate);
    return new BookReview(dto);
  }
}
