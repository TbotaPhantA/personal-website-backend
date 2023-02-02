import { Module } from '@nestjs/common';
import { LanguageModule } from './application/language/language.module';

@Module({
  imports: [LanguageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
