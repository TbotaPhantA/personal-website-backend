export enum ERROR_CODES {
  // invariants
  MUST_NOT_CONTAIN_SPECIAL_CHARACTERS = 'MUST_NOT_CONTAIN_SPECIAL_CHARACTERS',
  LANGUAGES_MUST_NOT_BE_REPEATED = 'LANGUAGES_MUST_NOT_BE_REPEATED',
  LANGUAGES_DONT_EXIST = "LANGUAGES_DONT_EXIST",
  LANGUAGE_ID_MUST_BE_UNIQUE = 'LANGUAGE_ID_MUST_BE_UNIQUE',
  // 400
  CANNOT_CREATE_BOOK_REVIEW = 'CANNOT_CREATE_BOOK_REVIEW',
  CANNOT_UPDATE_BOOK_REVIEW = 'CANNOT_UPDATE_BOOK_REVIEW',
  CANNOT_CREATE_LANGUAGE = 'CANNOT_CREATE_LANGUAGE',
  BOOK_REVIEW_NOT_FOUND = 'BOOK_REVIEW_NOT_FOUND',
  USERNAME_ALREADY_EXISTS = 'USERNAME_ALREADY_EXISTS',
  INCORRECT_USERNAME_OR_PASSWORD = 'INCORRECT_USERNAME_OR_PASSWORD',
  // 422
}

// 400
export const INVALID_DTO = 'INVALID_DTO'
export const INVARIANT_ERROR = 'INVARIANT_ERROR';

// 500
export const ROLES_ARE_NOT_ASSIGNED_FOR_ENDPOINT = 'ROLES_ARE_NOT_ASSIGNED_FOR_ENDPOINT'