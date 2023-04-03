import { Module } from '@nestjs/common';
import { LanguageModule } from './application/language/language.module';
import { BookReviewModule } from './application/bookReview/bookReview.module';
import { KnexModule } from './infrastructure/knex/knex.module';
import { ConfigModule } from './infrastructure/config/config.module';
import { UserModule } from './application/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import config from './infrastructure/config/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    LanguageModule,
    BookReviewModule,
    KnexModule,
    JwtModule.register({
      global: true,
      secret: config.auth.jwtSecret,
      signOptions: { expiresIn: config.auth.jwtExpiresIn },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
