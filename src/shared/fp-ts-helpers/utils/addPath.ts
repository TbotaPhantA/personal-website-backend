import { ErrorMessagesWithPath } from '../types/errorMessagesWithPath';

export const addPath = (path: string, em: ErrorMessagesWithPath) => {
  em.path = em.path === ''
    ? path
    : `${path}${em.path}`
  return em;
}
