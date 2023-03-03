import { Global, Module } from '@nestjs/common';
import { getKnexToken } from './shared/getKnexToken';
import knex from './knex';

@Global()
@Module({
  providers: [
    {
      provide: getKnexToken(),
      useValue: knex,
    },
  ],
  exports: [
    {
      provide: getKnexToken(),
      useValue: knex,
    },
  ],
})
export class KnexModule {}
