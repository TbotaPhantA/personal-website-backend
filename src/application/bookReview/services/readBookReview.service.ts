import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AllBookReviewsOutputDto } from '../../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { BOOK_REVIEW_REPOSITORY } from '../shared/tokens';
import { BookReviewRepository } from '../repositories/bookReviewRepository';
import {
  BookReview,
  ExtraBookReviewValidationProps,
} from '../../../domain/bookReview/bookReview';
import { ReadLanguageService } from '../../language/services/readLanguage.service';
import { BookReviewFormDto } from '../../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { BOOK_REVIEW_NOT_FOUND } from '../../../shared/errorMessages';

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

  public async getById(id: string): Promise<BookReview> {
    const review = await this.repository.findById(id);

    if (!review) {
      throw new BadRequestException(BOOK_REVIEW_NOT_FOUND);
    }

    return review;
  }

  public async getExtraValidationProps(
    dto: BookReviewFormDto,
  ): Promise<ExtraBookReviewValidationProps> {
    const { originalLanguageId, translations } = dto.article;
    const languages = [
      originalLanguageId,
      ...translations.map((t) => t.languageId),
    ];

    const doLanguagesExist = await this.readLanguage.doLanguagesExist(
      languages,
    );

    return { doLanguagesExist };
  }
}
