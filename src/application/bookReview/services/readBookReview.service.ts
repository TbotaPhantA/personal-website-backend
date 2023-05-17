import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AllBookReviewsOutputDto } from '../../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../shared/tokens';
import { BookReviewRepository } from '../repositories/bookReviewRepository';
import { ReadLanguageService } from '../../language/services/readLanguage.service';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BOOK_REVIEW_NOT_FOUND } from '../../../shared/errorMessages';
import { ITransaction } from '../shared/types/ITransaction';
import { ExtraBookReviewValidationProps } from '../../../domain/bookReview/shared/types/extraBookReviewValidationProps';
import { BookReview } from '../../../domain/bookReview/bookReview';

@Injectable()
export class ReadBookReviewService {
  constructor(
    @Inject(BOOK_REVIEW_REPOSITORY)
    private readonly repository: BookReviewRepository,
    private readonly readLanguage: ReadLanguageService,
  ) {}

  public async getAll(): Promise<AllBookReviewsOutputDto> {
    const reviews = await this.repository.getAll();
    return AllBookReviewsOutputDto.from(reviews);
  }

  public async getById(id: string, transaction: ITransaction): Promise<BookReview> {
    const review = await this.repository.findById(id, transaction);

    if (!review) {
      throw new BadRequestException(BOOK_REVIEW_NOT_FOUND);
    }

    return review;
  }

  public async getExtraValidationProps(
    dto: BookReviewFormDto,
    transaction: ITransaction,
  ): Promise<ExtraBookReviewValidationProps> {
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
