import { UserRepository } from './user.repository';
import { User } from '../../../domain/user/user';
import { Injectable } from '@nestjs/common';
import { InjectKnex } from '../../../infrastructure/knex/shared/injectKnex';
import { Knex } from 'knex';
import { RawUser } from '../../../domain/user/shared/types/rawUser';

@Injectable()
export class KnexUserRepository implements UserRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    const rawUsers = await this.knex
      .select({
        userId: 'users.user_id',
        username: 'users.username',
        role: 'users.role',
        passwordHash: 'users.password_hash',
      })
      .where({ username })
      .from<RawUser>('users')

    const [rawUser] = rawUsers;
    return rawUser ? new User(rawUser) : undefined;
  }
}
