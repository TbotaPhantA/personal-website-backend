import { BookReviewLanguage } from '../../../../domain/aggregates/langauge/bookReviewLanguage';

export class CreateLanguageOutputDto {
  code: string;
  name: string;

  public static from(language: BookReviewLanguage): CreateLanguageOutputDto {
    const dto = new CreateLanguageOutputDto();
    dto.name = language.name;
    dto.code = language.code;
    return dto;
  }
}
