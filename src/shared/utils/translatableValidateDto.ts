import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { FastifyRequest } from 'fastify';
import { validate } from 'class-validator-multi-lang-lite';
import en from '../i18n/class-validator/class-validator-en.json';
import ru from '../i18n/class-validator/class-validator-ru.json';
import { INVALID_DTO } from '../errors/errorMessages';
import { InvalidDtoException } from '../errors/invalidDtoException';

type Plain<T> = Record<keyof T, unknown>;

export class TranslatableValidateDto {
  private static messagesByLanguage: Record<string, Record<string, string>> = {
    en,
    ru,
  };

  public static async run<T extends object, V extends Plain<T>, R>(
    f: () => Promise<R>,
    cls: ClassConstructor<T>,
    plain: V,
    request: FastifyRequest,
  ): Promise<R> {
    const messages = TranslatableValidateDto.chooseMessages(request);
    const dto = plainToInstance(cls, plain);
    const errors = await validate(dto, {
      messages,
      whitelist: true,
    })

    if (errors.length > 0) {
      throw new InvalidDtoException(INVALID_DTO, { errors });
    }

    return f();
  }

  private static chooseMessages(request: FastifyRequest,) {
    const locale = request.headers['accept-language'];
    return this.messagesByLanguage[locale || 'en'];
  }
}
