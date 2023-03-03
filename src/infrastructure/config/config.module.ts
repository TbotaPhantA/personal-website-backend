import { Global, Module } from '@nestjs/common';
import config from './config';
import { getConfigToken } from './shared/getConfigToken';

@Global()
@Module({
  providers: [
    {
      provide: getConfigToken(),
      useValue: config,
    }
  ],
  exports: [
    {
      provide: getConfigToken(),
      useValue: config,
    }
  ],
})
export class ConfigModule {}
