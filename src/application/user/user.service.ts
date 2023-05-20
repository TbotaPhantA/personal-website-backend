import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './shared/tokens';
import { UserRepository } from './repositories/user.repository';
import { assertUserExists } from './shared/utils/asserts/assertUserExists';
import { assertPasswordMatches } from './shared/utils/asserts/assertPasswordMatches';
import { User } from '../../domain/user/user';
import { JwtService } from '@nestjs/jwt';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task'

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  login(dto: LoginUserFormDto): TE.TaskEither<UnauthorizedException, LoginOutputDto> {
    return pipe(
      TE.fromTask(this.userRepository.findOneByUsername(dto.username)),
      TE.chain(assertUserExists),
      TE.chain(assertPasswordMatches(dto.password)),
      TE.chainTaskK(this.generateAccessToken),
      TE.map(accessToken => ({ accessToken }))
    )
  }

  private generateAccessToken(user: User): T.Task<string> {
    return async () => {
      const { userId, username, role } = user;
      const payload = { userId, username, role };
      return this.jwtService.signAsync(payload);
    }
  }
}
