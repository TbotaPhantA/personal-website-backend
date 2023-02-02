import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { CreateLanguageService } from './services/createLanguage.service';
import { LANGUAGE_REPOSITORY } from './shared/tokens';
import { InMemoryLanguageRepository } from './repositories/inMemoryLanguage.repository';

@Module({
  controllers: [LanguageController],
  providers: [
    {
      provide: LANGUAGE_REPOSITORY,
      useClass: InMemoryLanguageRepository,
    },
    CreateLanguageService,
  ],
})
export class LanguageModule {}
