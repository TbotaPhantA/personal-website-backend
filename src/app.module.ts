import { Module } from '@nestjs/common';
import { LanguageModule } from './application/language/language.module';
import { BookReviewModule } from './application/bookReview/bookReview.module';
import { KnexModule } from './infrastructure/knex/knex.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { UserModule } from './application/user/user.module';

@Module({
  imports: [UserModule, ConfigModule, LanguageModule, BookReviewModule, KnexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
