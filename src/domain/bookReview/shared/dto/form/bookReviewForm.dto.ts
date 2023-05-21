import { ArticleFormDto } from '../../../../article/shared/dto/form/articleFormData.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator-multi-lang-lite';
import { Type } from 'class-transformer';

export class BookReviewFormDto {
  @IsNotEmpty()
  @Type(() => ArticleFormDto)
  @ValidateNested()
  @ApiProperty({ type: ArticleFormDto })
  article: ArticleFormDto;
}
