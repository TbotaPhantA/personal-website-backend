import { Injectable } from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { Knex } from 'knex';
import { Language } from '../../../domain/language/language';
import { InjectKnex } from '../../../infrastructure/knex/shared/injectKnex';
import { RawLanguage } from '../../../domain/language/shared/types/rawLanguage';
import * as T from 'fp-ts/Task';

const LANGUAGES_TABLE_NAME = 'languages';

@Injectable()
export class KnexLanguageRepository implements LanguageRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  findAll(): T.Task<Language[]> {
    return async () => {
      const rawLanguages = await this.knex
        .select('*')
        .from<RawLanguage>(LANGUAGES_TABLE_NAME)
        .limit(1000);

      return rawLanguages.map(l => new Language(l));
    }
  }

  findById(id: string, transaction: Knex.Transaction): T.Task<Language | undefined> {
    return async () => {
      const languages = await transaction
        .select('*')
        .where({ id })
        .from<RawLanguage>(LANGUAGES_TABLE_NAME)

      const rawLanguage = languages?.[0];
      return rawLanguage ? new Language(rawLanguage) : undefined;
    }
  }

  findManyByIds(ids: string[], transaction: Knex.Transaction): T.Task<Language[]> {
    return async () => {
      const languages = await transaction
        .select('*')
        .whereIn('id', ids)
        .from<RawLanguage>(LANGUAGES_TABLE_NAME)

      return languages.map(l => new Language(l));
    }
  }

  insert(language: Language, transaction: Knex.Transaction): T.Task<Language> {
    return async () => transaction.insert<RawLanguage>(language).into(LANGUAGES_TABLE_NAME);
  }

  update(language: Language, transaction: Knex.Transaction): T.Task<Language> {
    return async () => transaction.update(language).into(LANGUAGES_TABLE_NAME);
  }
}
