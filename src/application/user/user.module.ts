import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_REPOSITORY_TOKEN } from './shared/tokens';
import { KnexUserRepository } from './repositories/knexUser.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: KnexUserRepository,
    }
  ],
})
export class UserModule {}
