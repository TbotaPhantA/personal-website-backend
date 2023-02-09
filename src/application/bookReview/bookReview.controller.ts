import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookReviewOutputDto } from '../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { CreateBookReviewService } from './services/createBookReview.service';
import { BookReviewFormDto } from '../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from './services/readBookReview.service';
import { AllBookReviewsOutputDto } from '../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';

@Controller('book-review')
@UseFilters(AllExceptionFilter)
@ApiTags('book-review')
export class BookReviewController {
  constructor(
    private readonly readService: ReadBookReviewService,
    private readonly createService: CreateBookReviewService,
  ) {}

  @Get('all')
  @ApiOperation({ summary: 'get all book reviews' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'all book reviews were received',
    type: AllBookReviewsOutputDto,
  })
  async getAllLanguages(): Promise<AllBookReviewsOutputDto> {
    return this.readService.getAll();
  }

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
    return this.createService.createBookReview(dto);
  }
}
