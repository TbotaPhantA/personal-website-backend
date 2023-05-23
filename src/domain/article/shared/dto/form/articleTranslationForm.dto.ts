import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator-multi-lang-lite';
import { ALPHANUMERIC_REGEX } from '../../../../../shared/constants/noSpecialSymbolsRegEx';
import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';

export class ArticleTranslationFormDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(ALPHANUMERIC_REGEX, {
    message: ERROR_CODES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'en' })
  languageId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(ALPHANUMERIC_REGEX, {
    message: ERROR_CODES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'Title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Content' })
  content: string;
}
