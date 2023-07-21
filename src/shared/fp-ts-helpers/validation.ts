import * as E from 'fp-ts/Either';
import { invariantErrorSemigroup } from './invariantErrorSemigroup';

export const eitherValidation = E.getApplicativeValidation(invariantErrorSemigroup);
