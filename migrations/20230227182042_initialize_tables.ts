import { Knex } from "knex";

const LANGUAGES_TABLE_NAME='languages';
const ARTICLE_TRANSLATIONS_TABLE_NAME='article_translations';
const ARTICLES_TABLE_NAME='articles';
const BOOK_REVIEWS_TABLE_NAME='book_reviews';
const MAX_UUID_LENGTH=96
const LANGUAGE_CODE_LENGTH=2
const MAX_ARTICLE_LENGTH=50000

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .createTable(LANGUAGES_TABLE_NAME, function(table) {
      table.string('id', LANGUAGE_CODE_LENGTH).notNullable().primary();
      table.string('name', 255).notNullable();
    })
    .createTable(ARTICLES_TABLE_NAME, function(table) {
      table.string('id', MAX_UUID_LENGTH).notNullable().primary();
      table.string('original_language_id').notNullable()
        .references('id')
        .inTable(LANGUAGES_TABLE_NAME);
      table.string('original_title', 255).notNullable();
      table.text('original_content').checkLength('<', MAX_ARTICLE_LENGTH).notNullable();
    })
    .createTable(ARTICLE_TRANSLATIONS_TABLE_NAME, function(table) {
      table.string('id', MAX_UUID_LENGTH).notNullable().primary();
      table.string('article_id').notNullable()
        .references('id')
        .inTable(ARTICLES_TABLE_NAME)
        .onDelete('CASCADE')
      table.string('language_id').notNullable()
        .references('id')
        .inTable(LANGUAGES_TABLE_NAME);
      table.string('title', 255).notNullable();
      table.text('content').checkLength('<', MAX_ARTICLE_LENGTH).notNullable();
    })
    .createTable(BOOK_REVIEWS_TABLE_NAME, function(table) {
      table.string('id', MAX_UUID_LENGTH).notNullable().primary();
      table.string('article_id')
        .notNullable()
        .unique()
        .references('id')
        .inTable(ARTICLES_TABLE_NAME)
        .onDelete('CASCADE')
    });
}


export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema
    .dropTable(BOOK_REVIEWS_TABLE_NAME)
    .dropTable(ARTICLE_TRANSLATIONS_TABLE_NAME)
    .dropTable(ARTICLES_TABLE_NAME)
    .dropTable(LANGUAGES_TABLE_NAME)
}

