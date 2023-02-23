import { Module } from '@nestjs/common';
import { BookReviewController } from './bookReview.controller';
import { CreateBookReviewService } from './services/createBookReview/createBookReview.service';
import { BOOK_REVIEW_REPOSITORY } from './shared/tokens';
import { InMemoryBookReviewRepository } from './repositories/inMemoryBookReview.repository';
import { ReadBookReviewService } from './services/readBookReview.service';
import { BookReviewFactory } from './factories/bookReview.factory';
import { LanguageModule } from '../language/language.module';
import { UpdateBookReviewService } from './services/updateBookReview/updateBookReview.service';
import { CreateBookReviewTransaction } from './services/createBookReview/createBookReview.transaction';
import { UpdateBookReviewTransaction } from './services/updateBookReview/updateBookReview.transaction';

@Module({
  imports: [LanguageModule],
  controllers: [BookReviewController],
  providers: [
    {
      provide: BOOK_REVIEW_REPOSITORY,
      useClass: InMemoryBookReviewRepository,
    },
    ReadBookReviewService,
    CreateBookReviewService,
    CreateBookReviewTransaction,
    UpdateBookReviewService,
    UpdateBookReviewTransaction,
    BookReviewFactory,
  ],
})
export class BookReviewModule {}
