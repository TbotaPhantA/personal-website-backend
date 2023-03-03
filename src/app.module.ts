import { Module } from '@nestjs/common';
import { LanguageModule } from './application/language/language.module';
import { BookReviewModule } from './application/bookReview/bookReview.module';
import { KnexModule } from './infrastructure/knex/knex.module';
import { ConfigModule } from './infrastructure/config/config.module';

@Module({
  imports: [ConfigModule, LanguageModule, BookReviewModule, KnexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
