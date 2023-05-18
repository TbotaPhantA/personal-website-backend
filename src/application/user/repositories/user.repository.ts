import { User } from '../../../domain/user/user';
import * as T from 'fp-ts/Task';

export interface UserRepository {
  findOneByUsername(username: string): T.Task<User | undefined>;
}
