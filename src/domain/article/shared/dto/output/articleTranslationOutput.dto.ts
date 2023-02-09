import { ArticleTranslation } from '../../../articleTranslation/articleTranslation';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleTranslationOutputDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'uuid' })
  articleId: string;

  @ApiProperty({ example: 'en' })
  languageId: string;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'content' })
  content: string;

  public static from(
    articleTranslation: ArticleTranslation,
  ): ArticleTranslationOutputDto {
    const dto = new ArticleTranslationOutputDto();
    dto.id = articleTranslation.id;
    dto.articleId = articleTranslation.articleId;
    dto.languageId = articleTranslation.languageId;
    dto.title = articleTranslation.title;
    dto.content = articleTranslation.content;
    return dto;
  }
}
