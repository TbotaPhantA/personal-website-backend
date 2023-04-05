import { User } from '../../domain/user/user';

export type UserPayload = Pick<User, 'userId' | 'username' | 'role'>
