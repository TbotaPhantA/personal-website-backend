import { CreateLanguageProps } from './types/createLanguage.props';
import { ExtraLanguageValidation } from './types/extraLanguageValidation';
import { compose, Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { codeMustBeUnique } from './invariants/codeMustBeUnique';

export class BookReviewLanguage {
  code: string;
  name: string;

  constructor(props: CreateLanguageProps, validation: ExtraLanguageValidation) {
    const canCreate = BookReviewLanguage.canCreate(props, validation);
    assert('BookReviewLanguage', canCreate);
    this.code = props.code;
    this.name = props.name;
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof BookReviewLanguage>
  ): Invariant {
    const { isCodeUnique } = params[1];
    return compose(codeMustBeUnique(isCodeUnique));
  }
}
