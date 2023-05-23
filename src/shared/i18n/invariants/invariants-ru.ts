import { ERROR_CODES } from '../../errors/errorMessages';

export const ru: Record<ERROR_CODES, string> = {
  // invariants
  [ERROR_CODES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS]: 'не должно содержать специальные символы',
  [ERROR_CODES.LANGUAGES_MUST_NOT_BE_REPEATED]: 'языки не должны повторяться',
  [ERROR_CODES.LANGUAGES_DONT_EXIST]: 'данный язык не существует',
  [ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE]: 'код языка должен быть уникальным',
  // 400
  [ERROR_CODES.CANNOT_CREATE_BOOK_REVIEW]: 'не удалось создать book review',
  [ERROR_CODES.CANNOT_UPDATE_BOOK_REVIEW]: 'не удалось обновить book review',
  [ERROR_CODES.CANNOT_CREATE_LANGUAGE]: 'не удалось создать язык',
  [ERROR_CODES.BOOK_REVIEW_NOT_FOUND]: 'book review не найден',
  [ERROR_CODES.USERNAME_ALREADY_EXISTS]: 'username уже существует',
  [ERROR_CODES.INCORRECT_USERNAME_OR_PASSWORD]: 'не верный username или password',
  // 422
}
