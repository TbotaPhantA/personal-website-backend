import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookReviewOutputDto } from '../../domain/bookReview/shared/dto/output/bookReviewOutput.dto';
import { BookReviewFormDto } from '../../domain/bookReview/shared/dto/form/bookReviewForm.dto';
import { ReadBookReviewService } from './services/readBookReview.service';
import { AllBookReviewsOutputDto } from '../../domain/bookReview/shared/dto/output/allBookReviewsOutput.dto';
import { AllExceptionFilter } from '../../shared/exceptionFilters/allErrors.filter';
import { CreateBookReviewTransaction } from './services/createBookReview/createBookReview.transaction';
import { UpdateBookReviewTransaction } from './services/updateBookReview/updateBookReview.transaction';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles';
import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';
import * as E from 'fp-ts/Either';

@Controller('book-review')
@UseFilters(AllExceptionFilter)
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('book-review')
export class BookReviewController {
  constructor(
    private readonly readService: ReadBookReviewService,
    private readonly createServiceTransaction: CreateBookReviewTransaction,
    private readonly updateTransaction: UpdateBookReviewTransaction,
  ) {}

  @Get('all')
  @Roles(UserRoleEnum.VISITOR, UserRoleEnum.ADMIN)
  @ApiHeader({ name: 'authorization' })
  @ApiOperation({ summary: 'get all book reviews' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'all book reviews were received',
    type: AllBookReviewsOutputDto,
  })
  async getAllLanguages(): Promise<AllBookReviewsOutputDto> {
    return this.readService.getAll()();
  }

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @ApiHeader({ name: 'authorization' })
  @ApiOperation({ summary: 'Create new book review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New book review was successfully created',
    type: BookReviewOutputDto,
  })
  async createBookReview(
    @Body() dto: BookReviewFormDto,
  ): Promise<BookReviewOutputDto> {
    const result = await this.createServiceTransaction.run(dto);

    if (E.isLeft(result)) {
      throw result.left;
    } else {
      return result.right;
    }
  }

  @Put(':bookReviewId')
  @Roles(UserRoleEnum.ADMIN)
  @ApiHeader({ name: 'authorization' })
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
    const result = await this.updateTransaction.run(bookReviewId, dto);

    if (E.isLeft(result)) {
      throw result.left;
    } else {
      return result.right;
    }
  }
}
