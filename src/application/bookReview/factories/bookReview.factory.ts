import { Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { assertCanCreateBookReview } from '../shared/utils/asserts/assertCanCreateBookReview';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { ReadBookReviewService } from '../services/readBookReview.service';
import { ITransaction } from '../shared/types/ITransaction';

@Injectable()
export class BookReviewFactory {
  constructor(private readonly readBookReview: ReadBookReviewService) {}

  public async create(dto: BookReviewFormDto, transaction: ITransaction): Promise<BookReview> {
    const validation = await this.readBookReview.getExtraValidationProps(dto, transaction);
    const canCreate = BookReview.canCreate(dto, validation);
    assertCanCreateBookReview(canCreate);
    return new BookReview(dto, validation);
  }
}
