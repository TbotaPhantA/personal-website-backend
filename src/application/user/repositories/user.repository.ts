import { User } from '../../../domain/user/user';

export interface UserRepository {
  findOneByUsername(username: string): Promise<User | undefined>;
}
