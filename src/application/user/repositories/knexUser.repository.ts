import { UserRepository } from './user.repository';
import { User } from '../../../domain/user/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KnexUserRepository implements UserRepository {
  async findOneByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }
}
