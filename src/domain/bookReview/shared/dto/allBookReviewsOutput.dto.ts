import { BookReviewOutputDto } from './bookReviewOutput.dto';
import { BookReview } from '../../bookReview';
import { ApiProperty } from '@nestjs/swagger';

export class AllBookReviewsOutputDto {
  @ApiProperty({ type: [BookReviewOutputDto] })
  bookReviews: BookReviewOutputDto[];

  public static from(bookReviews: BookReview[]): AllBookReviewsOutputDto {
    const dto = new AllBookReviewsOutputDto();
    dto.bookReviews = bookReviews.map((r) => BookReviewOutputDto.from(r));
    return dto;
  }
}
