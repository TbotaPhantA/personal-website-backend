// eslint-disable-next-line max-len
import { LanguageFormDtoBuilder } from '../../../__fixtures__/builders/language/languageForm.dto.builder';
import { Language } from '../../../../src/domain/language/language';
import { success, fail } from '@derbent-ninjas/invariant-composer';
import { LANGUAGE_ID_MUST_BE_UNIQUE } from '../../../../src/shared/errorMessages';

const createLanguage = (): Language => {
  return new Language(LanguageFormDtoBuilder.defaultOnlyRequired.result, { isIdUnique: true });
}

describe('Create Language', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = LanguageFormDtoBuilder.defaultOnlyRequired.result;
      const language = new Language(dto, { isIdUnique: true });
      expect(language).toBeDefined();
    });

    test('when validation fails - should throw', () => {
      const dto = LanguageFormDtoBuilder.defaultOnlyRequired.result;
      expect(() => new Language(dto, { isIdUnique: false })).toThrow();
    });
  });

  describe('canCreate', () => {
    describe('id must be unique', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: LanguageFormDtoBuilder.defaultOnlyRequired.result,
          validation: {
            isIdUnique: true,
          },
          expectedInvariant: success(),
        },
        {
          toString: () => '2',
          dto: LanguageFormDtoBuilder.defaultOnlyRequired.result,
          validation: {
            isIdUnique: false,
          },
          expectedInvariant: fail({ message: LANGUAGE_ID_MUST_BE_UNIQUE }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        expect(Language.canCreate(dto, validation)).toStrictEqual(
          expectedInvariant,
        );
      });
    });
  });

  describe('update', () => {
    test('valid dto - should not throw', () => {
      const language = createLanguage();
      const validDto = LanguageFormDtoBuilder.defaultOnlyRequired.result;
      const validValidation = { isIdUnique: true };
      expect(() => language.update(validDto, validValidation)).not.toThrow();
    })

    test('not valid dto - should throw', () => {
      const language = createLanguage();
      const validDto = LanguageFormDtoBuilder.defaultOnlyRequired.result;
      const invalidValidation = { isIdUnique: false };
      expect(() => language.update(validDto, invalidValidation)).toThrow();
    })
  })

  describe('canUpdate', () => {
    describe('id must be unique', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: LanguageFormDtoBuilder.defaultOnlyRequired.result,
          validation: {
            isIdUnique: true,
          },
          expectedInvariant: success(),
        },
        {
          toString: () => '2',
          dto: LanguageFormDtoBuilder.defaultOnlyRequired.result,
          validation: {
            isIdUnique: false,
          },
          expectedInvariant: fail({ message: LANGUAGE_ID_MUST_BE_UNIQUE }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        // arrange
        const language = createLanguage();
        // act
        const canUpdate = language.canUpdate(dto, validation);
        // assert
        expect(canUpdate).toStrictEqual(
          expectedInvariant,
        );
      });
    });
  });
});
