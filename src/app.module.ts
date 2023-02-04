import { Module } from '@nestjs/common';
import { LanguageModule } from './application/language/language.module';
import { BookReviewModule } from './application/bookReview/bookReview.module';

@Module({
  imports: [LanguageModule, BookReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
