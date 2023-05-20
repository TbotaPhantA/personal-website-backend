import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BookReviewOutputDto } from '../../../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BookReviewFormDto } from '../../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from '../readBookReview.service';
import { ITransaction } from '../../shared/types/ITransaction';
import { BOOK_REVIEW_REPOSITORY } from '../../shared/tokens';
import { BookReviewRepository } from '../../repositories/bookReviewRepository';
import {
  ExtraBookReviewValidationProps,
} from '../../../../domain/bookReview/shared/types/extraBookReviewValidationProps';
import { BookReview } from '../../../../domain/bookReview/bookReview';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import * as A from 'fp-ts/Apply';
import * as NEA from 'fp-ts/NonEmptyArray';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';

@Injectable()
export class UpdateBookReviewService {
  constructor(
    private readonly readBookReview: ReadBookReviewService,
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
  ) {}

  updateBookReview(
    id: string,
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): TE.TaskEither<InvariantError | NEA.NonEmptyArray<BadRequestException>, BookReviewOutputDto> {
    return pipe(
      this.getReviewAndValidation(id, dto, transaction),
      TE.chainEitherKW(([review, validation]) => review.updateByDto(dto, validation)),
      TE.chain(review => TE.fromTask(this.repository.update(review, transaction))),
      TE.map(review => BookReviewOutputDto.from(review))
    )
  }

  private getReviewAndValidation(
    id: string,
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): TE.TaskEither<NEA.NonEmptyArray<BadRequestException>, [BookReview, ExtraBookReviewValidationProps]> {
    return A.sequenceT(TE.getApplicativeTaskValidation(T.ApplyPar, NEA.getSemigroup<BadRequestException>()))(
      this.readBookReview.getById(id, transaction),
      TE.fromTask(this.readBookReview.getExtraValidationProps(dto, transaction)),
    )
  }
}
