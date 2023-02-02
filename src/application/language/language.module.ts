import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { CreateLanguageService } from './services/createLanguage.service';
import { LANGUAGE_REPOSITORY } from './shared/tokens';
import { InMemoryLanguageRepository } from './repositories/inMemoryLanguage.repository';
import { GetLanguageService } from './services/getLanguage.service';

@Module({
  controllers: [LanguageController],
  providers: [
    {
      provide: LANGUAGE_REPOSITORY,
      useClass: InMemoryLanguageRepository,
    },
    GetLanguageService,
    CreateLanguageService,
  ],
})
export class LanguageModule {}
