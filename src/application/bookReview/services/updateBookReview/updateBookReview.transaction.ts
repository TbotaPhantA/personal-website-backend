import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { UpdateBookReviewService } from './updateBookReview.service';
import { InjectKnex } from '../../../../infrastructure/knex/shared/injectKnex';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';
import * as E from 'fp-ts/Either';
import * as NEA from 'fp-ts/NonEmptyArray';

@Injectable()
export class UpdateBookReviewTransaction {
  constructor(
    private readonly updateBookReviewService: UpdateBookReviewService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  public async run(
    id: string,
    dto: BookReviewFormDto
  ): Promise<E.Either<InvariantError | NEA.NonEmptyArray<BadRequestException>, BookReviewOutputDto>> {
    return this.knex.transaction(transaction => {
      return this.updateBookReviewService.updateBookReview(id, dto, transaction)();
    }, { isolationLevel: 'serializable' });
  }
}
