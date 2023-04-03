import { Knex } from "knex";

export const USERS_TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(USERS_TABLE_NAME, function(table) {
      table.string('user_id').notNullable().primary();
      table.string('username', 255).notNullable();
      table.string('role', 255).notNullable();
      table.string('password_hash', 255).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USERS_TABLE_NAME)
}

