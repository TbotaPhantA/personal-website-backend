import { Module } from '@nestjs/common';
import { CreateLanguageController } from './controllers/createLanguage.controller';
import { CreateLanguageService } from './services/createLanguage/createLanguage.service';
import { LANGUAGE_REPOSITORY } from './shared/tokens';
import { ReadLanguageService } from './services/readLanguage.service';
import { LanguageFactory } from './factories/language.factory';
import { CreateLanguageTransaction } from './services/createLanguage/createLanguage.transaction';
import { KnexLanguageRepository } from './repositories/knexLanguage.repository';
import { ReadLanguageController } from './controllers/readLanguage.controller';

@Module({
  controllers: [ReadLanguageController, CreateLanguageController],
  providers: [
    {
      provide: LANGUAGE_REPOSITORY,
      useClass: KnexLanguageRepository,
    },
    ReadLanguageService,
    CreateLanguageService,
    CreateLanguageTransaction,
    LanguageFactory,
  ],
  exports: [ReadLanguageService],
})
export class LanguageModule { }
