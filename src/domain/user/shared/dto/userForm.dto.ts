import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRoleEnum } from '../enums/userRole.enum';

export class UserFormDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
