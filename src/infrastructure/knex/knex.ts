import knex from 'knex';
import config from '../config/config';

export default knex({
  client: 'pg',
  connection: {
    database: config.postgres.db,
    host: config.postgres.host,
    port: Number(config.postgres.port),
    user: config.postgres.user,
    password: config.postgres.password,
  },
})
