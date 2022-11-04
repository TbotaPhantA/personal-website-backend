import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as util from 'util';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port, (err, address) => printStartResult(err, address));
}

const printStartResult = (err: Error, address: string): void => {
  if (err) {
    console.log(`Error during application start ${util.inspect(err)}`);
  } else {
    console.log(`Nest successfully started on ${address}`);
  }
};

bootstrap();
