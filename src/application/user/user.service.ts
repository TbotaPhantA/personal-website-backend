import { LoginOutputDto } from '../../domain/user/shared/dto/output/loginOutputDto';
import { LoginUserFormDto } from '../../domain/user/shared/dto/form/loginUserForm.dto';
import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './shared/tokens';
import { UserRepository } from './repositories/user.repository';
import { assertUserExists } from './shared/utils/asserts/assertUserExists';
import { assertPasswordMatches } from './shared/utils/asserts/assertPasswordMatches';
import { User } from '../../domain/user/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUserFormDto): Promise<LoginOutputDto> {
    const user = await this.userRepository.findOneByUsername(dto.username);
    assertUserExists(user);
    assertPasswordMatches(user, dto.password);
    return { accessToken: await this.generateAccessToken(user) }
  }

  private async generateAccessToken(user: User): Promise<string> {
    const { userId, username, role } = user;
    const payload = { userId, username, role };
    return this.jwtService.signAsync(payload);
  }
}
