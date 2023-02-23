import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { UpdateBookReviewService } from './updateBookReview.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateBookReviewTransaction {
  constructor(private readonly updateBookReviewService: UpdateBookReviewService) {}

  public async run(id: string, dto: BookReviewFormDto): Promise<BookReviewOutputDto> {
    const fakeTransaction = {}
    return this.updateBookReviewService.updateBookReview(id, dto, fakeTransaction);
  }
}
