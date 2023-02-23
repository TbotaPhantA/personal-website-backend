import { Injectable } from '@nestjs/common';
import { CreateLanguageService } from './createLanguage.service';
import { LanguageOutputDto } from '../../../../domain/language/shared/dto/output/languageOutput.dto';
import { LanguageFormDto } from '../../../../domain/language/shared/dto/form/languageForm.dto';

@Injectable()
export class CreateLanguageTransaction {
  constructor(private readonly createLanguageService: CreateLanguageService) {}

  public async run(dto: LanguageFormDto): Promise<LanguageOutputDto> {
    const fakeTransaction = {}
    return this.createLanguageService.createLanguage(dto, fakeTransaction);
  }
}
