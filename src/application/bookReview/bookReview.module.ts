import { Module } from '@nestjs/common';
import { BookReviewController } from './bookReview.controller';
import { CreateBookReviewService } from './services/createBookReview.service';
import { BOOK_REVIEW_REPOSITORY } from './shared/tokens';
import { InMemoryBookReviewRepository } from './repositories/inMemoryBookReview.repository';
import { ReadBookReviewService } from './services/readBookReview.service';

@Module({
  controllers: [BookReviewController],
  providers: [
    {
      provide: BOOK_REVIEW_REPOSITORY,
      useClass: InMemoryBookReviewRepository,
    },
    ReadBookReviewService,
    CreateBookReviewService,
  ],
})
export class BookReviewModule {}
