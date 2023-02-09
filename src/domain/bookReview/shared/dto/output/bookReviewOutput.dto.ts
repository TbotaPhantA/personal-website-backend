import { BookReview } from '../../../bookReview';
import { ArticleOutputDto } from '../../../../article/shared/dto/output/articleOutput.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookReviewOutputDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ type: ArticleOutputDto })
  article: ArticleOutputDto;

  public static from(bookReview: BookReview): BookReviewOutputDto {
    const dto = new BookReviewOutputDto();
    dto.id = bookReview.id;
    dto.article = ArticleOutputDto.from(bookReview.article);
    return dto;
  }
}
