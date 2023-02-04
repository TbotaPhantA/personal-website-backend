import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookReviewOutputDto } from '../../domain/bookReview/shared/dto/bookReviewOutput.dto';
import { CreateBookReviewService } from './services/createBookReview.service';
import { BookReviewFormDto } from '../../domain/bookReview/shared/dto/bookReviewForm.dto';

@Controller('book-review')
@ApiTags('book-review')
export class BookReviewController {
  constructor(
    private readonly createBookReviewService: CreateBookReviewService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new book review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New book review was successfully created',
    type: BookReviewOutputDto,
  })
  async createBookReview(
    @Body() dto: BookReviewFormDto,
  ): Promise<BookReviewOutputDto> {
    return this.createBookReviewService.createBookReview(dto);
  }
}
