import { ArticleTranslationFormDto } from './articleTranslationForm.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ALPHANUMERIC_REGEX } from '../../../../shared/constants/noSpecialSymbolsRegEx';
import { MUST_NOT_CONTAIN_SPECIAL_CHARACTERS } from '../../../../shared/errorMessages';

export class ArticleFormDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'en' })
  originalLanguageId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @Matches(ALPHANUMERIC_REGEX, {
    message: MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
  })
  @ApiProperty({ example: 'Title' })
  originalTitle: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Content' })
  originalContent: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({ type: [ArticleTranslationFormDto] })
  translations: ArticleTranslationFormDto[];
}
