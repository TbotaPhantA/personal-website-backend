import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator-multi-lang-lite';
import { ALPHANUMERIC_REGEX } from '../../../../../shared/constants/noSpecialSymbolsRegEx';
import { MUST_NOT_CONTAIN_SPECIAL_CHARACTERS } from '../../../../../shared/errorMessages';

export class LanguageFormDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'en' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'English' })
  name: string;
}
