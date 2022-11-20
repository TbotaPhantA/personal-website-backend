import { Injectable } from '@nestjs/common';
import { CreateLanguageOutputDto } from '../dto/create/createLanguageOutput.dto';
import { CreateLanguageInputDto } from '../dto/create/createLanguageInput.dto';

@Injectable()
export class LanguageCreateService {
  public async createLanguage(
    dto: CreateLanguageInputDto,
  ): Promise<CreateLanguageOutputDto> {
    return CreateLanguageOutputDto.from(dto);
  }
}
