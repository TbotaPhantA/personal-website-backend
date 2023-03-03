import { Injectable } from '@nestjs/common';
import { LanguageRepository } from './language.repository';
import { Knex } from 'knex';
import { Language } from '../../../domain/language/language';
import { InjectKnex } from '../../../infrastructure/knex/shared/injectKnex';
import { RawLanguage } from '../../../domain/language/shared/types/rawLanguage';

const LANGUAGES_TABLE_NAME = 'languages';

@Injectable()
export class KnexLanguageRepository implements LanguageRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findAll(): Promise<Language[]> {
    const rawLanguages = await this.knex
      .select('*')
      .from<RawLanguage>(LANGUAGES_TABLE_NAME)
      .limit(1000);

    return rawLanguages.map(l => new Language(l));
  }

  async findById(id: string, transaction: Knex.Transaction): Promise<Language | undefined> {
    const languages = await transaction
      .select('*')
      .where({ id })
      .from<RawLanguage>(LANGUAGES_TABLE_NAME)

    const rawLanguage = languages?.[0];
    return rawLanguage ? new Language(rawLanguage) : undefined;
  }

  async findManyByIds(ids: string[], transaction: Knex.Transaction): Promise<Language[]> {
    const languages = await transaction
      .select('*')
      .whereIn('id', ids)
      .from<RawLanguage>(LANGUAGES_TABLE_NAME)

    return languages.map(l => new Language(l));
  }

  async insert(language: Language, transaction: Knex.Transaction): Promise<Language> {
    return transaction.insert<RawLanguage>(language).into(LANGUAGES_TABLE_NAME);
  }

  async update(language: Language, transaction: Knex.Transaction): Promise<Language> {
    return transaction.update(language).into(LANGUAGES_TABLE_NAME);
  }
}
