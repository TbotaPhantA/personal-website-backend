import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { CreateLanguageService } from './services/createLanguage/createLanguage.service';
import { LANGUAGE_REPOSITORY } from './shared/tokens';
import { InMemoryLanguageRepository } from './repositories/inMemoryLanguage.repository';
import { ReadLanguageService } from './services/readLanguage.service';
import { LanguageFactory } from './factories/language.factory';
import { CreateLanguageTransaction } from './services/createLanguage/createLanguage.transaction';

@Module({
  controllers: [LanguageController],
  providers: [
    {
      provide: LANGUAGE_REPOSITORY,
      useClass: InMemoryLanguageRepository,
    },
    ReadLanguageService,
    CreateLanguageService,
    CreateLanguageTransaction,
    LanguageFactory,
  ],
  exports: [ReadLanguageService],
})
export class LanguageModule {}
