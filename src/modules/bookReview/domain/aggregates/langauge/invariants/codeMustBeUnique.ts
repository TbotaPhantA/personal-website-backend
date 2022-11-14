import { fail, success } from '@derbent-ninjas/invariant-composer';
import { CODE_MUST_BE_UNIQUE } from '../error-messages';

export const codeMustBeUnique = (isCodeUnique: boolean) => {
  return isCodeUnique ? success() : fail({ message: CODE_MUST_BE_UNIQUE });
};
