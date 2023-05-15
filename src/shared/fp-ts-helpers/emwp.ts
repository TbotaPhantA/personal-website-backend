import { ErrorMessagesWithPath } from './types/errorMessagesWithPath';

export const emwp = (errorMessage: string): ErrorMessagesWithPath => ({
  _tag: 'ErrorMessagesWithPath',
  path: '',
  messages: [errorMessage],
})
