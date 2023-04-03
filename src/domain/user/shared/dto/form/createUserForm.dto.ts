import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRoleEnum } from '../../enums/userRole.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserFormDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty({ example: 'name' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRoleEnum)
  @ApiProperty({ example: UserRoleEnum.ADMIN, enum: UserRoleEnum })
  role: UserRoleEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @ApiProperty({ example: 'password' })
  password: string;
}
