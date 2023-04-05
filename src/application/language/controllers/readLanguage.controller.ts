import { Controller, Get, HttpStatus, UseFilters, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllLanguagesOutputDto } from 'src/domain/language/shared/dto/output/allLanguagesOutput.dto';
import { AllExceptionFilter } from 'src/shared/exceptionFilters/allErrors.filter';
import { ReadLanguageService } from '../services/readLanguage.service';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles';
import { UserRoleEnum } from '../../../domain/user/shared/enums/userRole.enum';

@Controller('language')
@UseFilters(AllExceptionFilter)
@UseGuards(RolesGuard)
@ApiTags('language')
export class ReadLanguageController {
  constructor(
    private readonly readService: ReadLanguageService,
  ) {}

  @Get('all')
  @Roles(UserRoleEnum.VISITOR, UserRoleEnum.ADMIN)
  @ApiHeader({ name: 'authorization' })
  @ApiOperation({ summary: 'get all languages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'all languages were received',
    type: AllLanguagesOutputDto,
  })
  async getAllLanguages(): Promise<AllLanguagesOutputDto> {
    return this.readService.getAll();
  }
}
