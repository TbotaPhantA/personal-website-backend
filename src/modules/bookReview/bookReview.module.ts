import { Module } from '@nestjs/common';
import { LanguageCreateService } from './application/aggregates/services/languageCreate.service';

@Module({
  providers: [LanguageCreateService],
})
export class BookReviewModule {}
