import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { CreateLanguageService } from './services/createLanguage.service';
import { LANGUAGE_REPOSITORY } from './shared/tokens';
import { InMemoryLanguageRepository } from './repositories/inMemoryLanguage.repository';
import { ReadLanguageService } from './services/readLanguage.service';
import { LanguageFactory } from './factories/language.factory';

@Module({
  controllers: [LanguageController],
  providers: [
    {
      provide: LANGUAGE_REPOSITORY,
      useClass: InMemoryLanguageRepository,
    },
    ReadLanguageService,
    CreateLanguageService,
    LanguageFactory,
  ],
  exports: [ReadLanguageService],
})
export class LanguageModule {}
