import { ArticleFormDto } from '../../../article/shared/dto/articleFormData.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookReviewFormDto {
  @ApiProperty({ type: ArticleFormDto })
  article: ArticleFormDto;
}
