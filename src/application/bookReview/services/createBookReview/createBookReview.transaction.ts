import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { CreateBookReviewService } from './createBookReview.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBookReviewTransaction {
  constructor(private readonly createBookReviewService: CreateBookReviewService) {}

  public async run(dto: BookReviewFormDto): Promise<BookReviewOutputDto> {
    const fakeTransaction = {}
    return this.createBookReviewService.createBookReview(dto, fakeTransaction);
  }
}
