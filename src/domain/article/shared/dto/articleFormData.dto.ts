import { ArticleTranslationFormDto } from './articleTranslationForm.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleFormDto {
  @ApiProperty({ example: 'en' })
  originalLanguageId: string;

  @ApiProperty({ example: 'Title' })
  originalTitle: string;

  @ApiProperty({ example: 'Content' })
  originalContent: string;

  @ApiProperty({ type: [ArticleTranslationFormDto] })
  translations: ArticleTranslationFormDto[];
}
