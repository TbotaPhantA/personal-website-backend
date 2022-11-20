import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BookReviewModule } from './modules/bookReview/bookReview.module';

@Module({
  imports: [BookReviewModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
