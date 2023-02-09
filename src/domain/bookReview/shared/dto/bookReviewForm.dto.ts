import { ArticleFormDto } from '../../../article/shared/dto/articleFormData.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class BookReviewFormDto {
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ type: ArticleFormDto })
  article: ArticleFormDto;
}