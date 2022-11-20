import { Controller } from '@nestjs/common';
import { CreateLanguageInputDto } from './dto/create/createLanguageInput.dto';
import { CreateLanguageOutputDto } from './dto/create/createLanguageOutput.dto';
import { LanguageCreateService } from './services/languageCreate.service';

@Controller()
export class LanguageController {
  constructor(private readonly create: LanguageCreateService) {}

  public async createLanguage(
    dto: CreateLanguageInputDto,
  ): Promise<CreateLanguageOutputDto> {
    return this.create.createLanguage(dto);
  }
}
