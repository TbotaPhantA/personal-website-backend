import { Inject } from '@nestjs/common';
import { getKnexToken } from './getKnexToken';

export const InjectKnex = (): ReturnType<typeof Inject> => Inject(getKnexToken());
