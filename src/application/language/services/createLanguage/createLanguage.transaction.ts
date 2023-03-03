import { Injectable } from '@nestjs/common';
import { CreateLanguageService } from './createLanguage.service';
import { LanguageOutputDto } from '../../../../domain/language/shared/dto/output/languageOutput.dto';
import { LanguageFormDto } from '../../../../domain/language/shared/dto/form/languageForm.dto';
import { InjectKnex } from '../../../../infrastructure/knex/shared/injectKnex';
import { Knex } from 'knex';

@Injectable()
export class CreateLanguageTransaction {
  constructor(
    private readonly createLanguageService: CreateLanguageService,
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  public async run(dto: LanguageFormDto): Promise<LanguageOutputDto> {
    return this.knex.transaction(transaction => {
      return this.createLanguageService.createLanguage(dto, transaction);
    }, { isolationLevel: 'serializable' });
  }
}
