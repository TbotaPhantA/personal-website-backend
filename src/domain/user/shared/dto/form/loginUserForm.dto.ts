import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserFormDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty({ example: 'name' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({ example: 'password' })
  password: string;
}
