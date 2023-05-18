import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { CreateLanguageService } from './createLanguage.service';
import { LanguageFormDto } from '../../../../domain/language/shared/dto/form/languageForm.dto';
import { InjectKnex } from '../../../../infrastructure/knex/shared/injectKnex';
import * as E from 'fp-ts/Either';
import { LanguageOutputDto } from '../../../../domain/language/shared/dto/output/languageOutput.dto';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';

@Injectable()
export class CreateLanguageTransaction {
  constructor(
    private readonly createLanguageService: CreateLanguageService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  public run(dto: LanguageFormDto): Promise<E.Either<InvariantError, LanguageOutputDto>> {
    return this.knex.transaction(transaction => {
      return this.createLanguageService.createLanguage(dto, transaction)();
    }, { isolationLevel: 'serializable' });
  }
}
