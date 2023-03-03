import { Inject } from '@nestjs/common';
import { getConfigToken } from './getConfigToken';

export const InjectConfig = (): ReturnType<typeof Inject> => Inject(getConfigToken());
