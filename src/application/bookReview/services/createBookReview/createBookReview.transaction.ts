import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { CreateBookReviewService } from './createBookReview.service';
import { InjectKnex } from '../../../../infrastructure/knex/shared/injectKnex';
import * as E from 'fp-ts/Either';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';

@Injectable()
export class CreateBookReviewTransaction {
  constructor(
    private readonly createBookReviewService: CreateBookReviewService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  public async run(dto: BookReviewFormDto): Promise<E.Either<InvariantError, BookReviewOutputDto>> {
    return this.knex.transaction(transaction => {
      return this.createBookReviewService.createBookReview(dto, transaction)();
    }, { isolationLevel: 'serializable' });
  }
}
