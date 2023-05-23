import { ERROR_CODES } from '../../errors/errorMessages';

export const en: Record<ERROR_CODES, string> = {
  // invariants
  [ERROR_CODES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS]: 'must not contain special characters',
  [ERROR_CODES.LANGUAGES_MUST_NOT_BE_REPEATED]: 'languages must not be repeated',
  [ERROR_CODES.LANGUAGES_DONT_EXIST]: 'languages dont exist',
  [ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE]: 'language id must be unique',
  // 400
  [ERROR_CODES.CANNOT_CREATE_BOOK_REVIEW]: 'cannot create book review',
  [ERROR_CODES.CANNOT_UPDATE_BOOK_REVIEW]: 'cannot update book review',
  [ERROR_CODES.CANNOT_CREATE_LANGUAGE]: 'cannot create language',
  [ERROR_CODES.BOOK_REVIEW_NOT_FOUND]: 'book review not found',
  [ERROR_CODES.USERNAME_ALREADY_EXISTS]: 'username already exists',
  [ERROR_CODES.INCORRECT_USERNAME_OR_PASSWORD]: 'incorrect username or password',
}
