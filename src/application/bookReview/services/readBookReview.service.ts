import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AllBookReviewsOutputDto } from '../../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../shared/tokens';
import { BookReviewRepository } from '../repositories/bookReviewRepository';
import { ReadLanguageService } from '../../language/services/readLanguage.service';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ERROR_CODES } from '../../../shared/errors/errorMessages';
import { ITransaction } from '../shared/types/ITransaction';
import { ExtraBookReviewValidationProps } from '../../../domain/bookReview/shared/types/extraBookReviewValidationProps';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { pipe } from 'fp-ts/lib/function';
import * as T from 'fp-ts/Task';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

@Injectable()
export class ReadBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
    private readonly readLanguage: ReadLanguageService,
  ) {}

  public getAll(): T.Task<AllBookReviewsOutputDto> {
    return pipe(
      this.repository.getAll(),
      T.map(reviews => AllBookReviewsOutputDto.from(reviews))
    )
  }

  public getById(id: string, transaction: ITransaction): TE.TaskEither<[BadRequestException], BookReview> {
    return pipe(
      this.repository.findById(id, transaction),
      T.map(review => review ? E.right(review) : E.left([new BadRequestException(ERROR_CODES.BOOK_REVIEW_NOT_FOUND)])),
    )
  }

  public getExtraValidationProps(
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): T.Task<ExtraBookReviewValidationProps> {
    return async () => {
      const { originalLanguageId, translations } = dto.article;
      const languages = [
        originalLanguageId,
        ...translations.map((t) => t.languageId),
      ];

      const doLanguagesExist = await this.readLanguage.doLanguagesExist(
        languages,
        transaction,
      )();

      return { doLanguagesExist };
    }
  }
}
