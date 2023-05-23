import en from '../../../../src/shared/i18n/class-validator/class-validator-en.json';
import ru from '../../../../src/shared/i18n/class-validator/class-validator-ru.json';
import { INVALID_DTO } from '../../../../src/shared/errorMessages';
import { TranslatableValidateDto } from '../../../../src/shared/utils/translatableValidateDto';
import { LanguageFormDto } from '../../../../src/domain/language/shared/dto/form/languageForm.dto';
import { LanguageFormDtoBuilder } from '../../../__fixtures__/builders/language/languageForm.dto.builder';
import { FastifyRequest } from 'fastify';

describe('TranslatableValidateDto', () => {
  describe('run', () => {
    const notThrowsTestCases = [
      {
        toString: () => '1',
        cls: LanguageFormDto,
        plain: LanguageFormDtoBuilder.defaultOnlyRequired.result,
        request: { headers: { 'accept-language': 'en' } }
      },
      {
        toString: () => '2',
        cls: LanguageFormDto,
        plain: LanguageFormDtoBuilder.defaultOnlyRequired.result,
        request: { headers: { 'accept-language': 'ru' } }
      },
    ];

    test.each(notThrowsTestCases)('%s', async ({ cls, plain, request }) => {
      await expect(TranslatableValidateDto.run(async () => undefined, cls, plain, request as FastifyRequest)).resolves.not.toThrow()
    });

    const throwsTestCases = [
      {
        toString: () => '3',
        cls: LanguageFormDto,
        plain: LanguageFormDtoBuilder.defaultOnlyRequired.with({ id: 'ene' }).result,
        request: { headers: { 'accept-language': 'ru' } }
      },
    ]

    test.each(throwsTestCases)('%s', async ({ cls, plain, request }) => {
      await expect(TranslatableValidateDto.run(async () => undefined, cls, plain, request as FastifyRequest)).rejects.toThrow(INVALID_DTO);
    });
  });
});
