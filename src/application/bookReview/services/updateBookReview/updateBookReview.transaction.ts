import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { UpdateBookReviewService } from './updateBookReview.service';
import { InjectKnex } from '../../../../infrastructure/knex/shared/injectKnex';

@Injectable()
export class UpdateBookReviewTransaction {
  constructor(
    private readonly updateBookReviewService: UpdateBookReviewService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  public async run(id: string, dto: BookReviewFormDto): Promise<BookReviewOutputDto> {
    return this.knex.transaction(transaction => {
      return this.updateBookReviewService.updateBookReview(id, dto, transaction);
    }, { isolationLevel: 'serializable' });
  }
}
