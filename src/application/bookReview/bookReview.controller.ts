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
import { BookReviewFormDto } from '../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from './services/readBookReview.service';
import { AllBookReviewsOutputDto } from '../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { CreateBookReviewTransaction } from './services/createBookReview/createBookReview.transaction';
import { UpdateBookReviewTransaction } from './services/updateBookReview/updateBookReview.transaction';

@Controller('book-review')
@UseFilters(AllExceptionFilter)
@ApiTags('book-review')
export class BookReviewController {
  constructor(
    private readonly readService: ReadBookReviewService,
    private readonly createServiceTransaction: CreateBookReviewTransaction,
    private readonly updateTransaction: UpdateBookReviewTransaction,
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
    return this.createServiceTransaction.run(dto);
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
    return this.updateTransaction.run(bookReviewId, dto);
  }
}
