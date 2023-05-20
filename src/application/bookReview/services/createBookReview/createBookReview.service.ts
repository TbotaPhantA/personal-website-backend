import { Inject, Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../../shared/tokens';
import { BookReviewRepository } from '../../repositories/bookReviewRepository';
import { BookReviewFactory } from '../../factories/bookReview.factory';
import { ITransaction } from '../../shared/types/ITransaction';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

@Injectable()
export class CreateBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
    private readonly bookReviewFactory: BookReviewFactory,
  ) {}

  public createBookReview(
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): TE.TaskEither<InvariantError, BookReviewOutputDto> {
    return pipe(
      this.bookReviewFactory.create(dto, transaction),
      TE.chainTaskK(this.repository.insert(transaction)),
      TE.map(BookReviewOutputDto.from),
    )
  }
}
