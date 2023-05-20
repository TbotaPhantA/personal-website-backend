import { Injectable } from '@nestjs/common';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { ReadBookReviewService } from '../services/readBookReview.service';
import { ITransaction } from '../shared/types/ITransaction';
import { InvariantError } from '../../../shared/fp-ts-helpers/errors/invariantError';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';

@Injectable()
export class BookReviewFactory {
  constructor(private readonly readBookReview: ReadBookReviewService) {}

  public create(dto: BookReviewFormDto, transaction: ITransaction): TE.TaskEither<InvariantError, BookReview> {
    return pipe(
      this.readBookReview.getExtraValidationProps(dto, transaction),
      T.map((validation) => BookReview.createByDto(dto, validation)),
    )
  }
}
