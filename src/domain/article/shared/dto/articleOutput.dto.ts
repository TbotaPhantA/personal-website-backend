import { ArticleTranslationOutputDto } from './articleTranslationOutput.dto';
import { Article } from '../../article';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleOutputDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'en' })
  originalLanguageId: string;

  @ApiProperty({ example: 'title' })
  originalTitle: string;

  @ApiProperty({ example: 'content' })
  originalContent: string;

  @ApiProperty({ type: [ArticleTranslationOutputDto] })
  translations: ArticleTranslationOutputDto[];

  public static from(article: Article): ArticleOutputDto {
    const dto = new ArticleOutputDto();
    dto.id = article.id;
    dto.originalLanguageId = article.originalLanguageId;
    dto.originalTitle = article.originalTitle;
    dto.originalContent = article.originalContent;
    dto.translations = article.translations.map((t) =>
      ArticleTranslationOutputDto.from(t),
    );
    return dto;
  }
}
