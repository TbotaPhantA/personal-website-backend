import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGE_REPOSITORY } from '../shared/tokens';
import { LanguageRepository } from '../repositories/language.repository';
import { GetAllLanguagesOutputDto } from '../dto/getAllLanguagesOutput.dto';
import { LanguageOutputDto } from '../../../domain/language/shared/dto/languageOutput.dto';

@Injectable()
export class GetLanguageService {
  constructor(
    @Inject(LANGUAGE_REPOSITORY)
    private readonly languageRepository: LanguageRepository,
  ) {}

  public async getAll(): Promise<GetAllLanguagesOutputDto> {
    const languages = await this.languageRepository.findAll();
    return { languages: languages.map((l) => LanguageOutputDto.from(l)) };
  }
}
