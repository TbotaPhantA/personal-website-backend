import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageRepository } from '../repositories/language.repository';
import { AllLanguagesOutputDto } from '../../../domain/language/shared/dto/output/allLanguagesOutput.dto';

@Injectable()
export class ReadLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  public async getAll(): Promise<AllLanguagesOutputDto> {
    const languages = await this.languageRepository.findAll();
    return AllLanguagesOutputDto.from(languages);
  }
}
