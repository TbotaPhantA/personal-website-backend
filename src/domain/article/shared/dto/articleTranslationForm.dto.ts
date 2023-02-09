import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { ALPHANUMERIC_REGEX } from '../../../../shared/constants/noSpecialSymbolsRegEx';
import { MUST_NOT_CONTAIN_SPECIAL_CHARACTERS } from '../../../../shared/errorMessages';

export class ArticleTranslationFormDto {
  @IsNotEmpty()
  @IsString()
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'uuid' })
  articleId: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'en' })
  languageId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'Title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Content' })
  content: string;
}
