import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookReviewOutputDto } from '../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { CreateBookReviewService } from './services/createBookReview.service';
import { BookReviewFormDto } from '../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from './services/readBookReview.service';
import { AllBookReviewsOutputDto } from '../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { UpdateBookReviewService } from './services/updateBookReview.service';

@Controller('book-review')
@UseFilters(AllExceptionFilter)
@ApiTags('book-review')
export class BookReviewController {
  constructor(
    private readonly readService: ReadBookReviewService,
    private readonly createService: CreateBookReviewService,
    private readonly updateService: UpdateBookReviewService,
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

  @Put(':bookReviewId')
  @ApiOperation({ summary: 'Update new book review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book review was successfully updated',
    type: BookReviewOutputDto,
  })
  async updateBookReview(
    @Param('bookReviewId') bookReviewId: string,
    @Body() dto: BookReviewFormDto,
  ): Promise<BookReviewOutputDto> {
    return this.updateService.updateBookReview(bookReviewId, dto);
  }
}
