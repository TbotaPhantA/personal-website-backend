// eslint-disable-next-line max-len
import { LanguageFormDtoBuilder } from '../../../__fixtures__/builders/language/languageForm.dto.builder';
import { Language } from '../../../../src/domain/language/language';
import { ERROR_CODES } from '../../../../src/shared/errors/errorMessages';
import * as E from 'fp-ts/Either';
import { addPath } from '../../../../src/shared/fp-ts-helpers/utils/addPath';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';

describe('Language', () => {
  describe('createByDto', () => {
    const testCases = [
      {
        toString: () => '1',
        dto: LanguageFormDtoBuilder.defaultOnlyRequired.with({
          id: 'en',
          name: 'English'
        }).result,
        validation: { isIdUnique: true },
        expectedEither: E.right(new Language({
          id: 'en',
          name: 'English'
        })),
      },
      {
        toString: () => '2',
        dto: LanguageFormDtoBuilder.defaultOnlyRequired.with({
          id: 'en',
          name: 'English'
        }).result,
        validation: { isIdUnique: false },
        expectedEither: E.left(addPath('id', createInvariantError(ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE))),
      },
    ];

    test.each(testCases)('%s', ({
      dto,
      validation,
      expectedEither
    }) => {
      const resultEither = Language.createByDto(dto, validation);
      expect(resultEither).toStrictEqual(expectedEither);
    })
  })

  describe('updateByDto', () => {
    const testCases = [
      {
        toString: () => '1',
        dto: LanguageFormDtoBuilder.defaultOnlyRequired.with({
          id: 'en',
          name: 'English'
        }).result,
        validation: { isIdUnique: true },
        expectedEither: E.right(new Language({
          id: 'en',
          name: 'English'
        })),
      },
      {
        toString: () => '2',
        dto: LanguageFormDtoBuilder.defaultOnlyRequired.with({
          id: 'en',
          name: 'English'
        }).result,
        validation: { isIdUnique: false },
        expectedEither: E.left(addPath('id', createInvariantError(ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE))),
      },
    ];

    test.each(testCases)('%s', ({
      dto,
      validation,
      expectedEither
    }) => {
      const language = new Language(dto);
      const resultEither = language.updateByDto(dto, validation);
      expect(resultEither).toStrictEqual(expectedEither);
    })
  })
});
