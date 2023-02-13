import { Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { assertCanCreateBookReview } from '../shared/utils/asserts/assertCanCreateBookReview';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { ReadBookReviewService } from '../services/readBookReview.service';

@Injectable()
export class BookReviewFactory {
  constructor(private readonly readBookReview: ReadBookReviewService) {}

  public async create(dto: BookReviewFormDto): Promise<BookReviewOutputDto> {
    const validation = await this.readBookReview.getExtraValidationProps(dto);
    const canCreate = BookReview.canCreate(dto, validation);
    assertCanCreateBookReview(canCreate);
    return new BookReview(dto, validation);
  }
}
