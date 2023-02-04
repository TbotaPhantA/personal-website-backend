import { ApiProperty } from '@nestjs/swagger';

export class ArticleTranslationFormDto {
  @ApiProperty({ example: 'uuid' })
  articleId: string;

  @ApiProperty({ example: 'en' })
  languageId: string;

  @ApiProperty({ example: 'Title' })
  title: string;

  @ApiProperty({ example: 'Content' })
  content: string;
}
