import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as util from 'util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.REST_PORT;

  const app = await createApp();

  const config = new DocumentBuilder().setTitle('Portfolio').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, (err, address) => printStartResult(err, address));
}

const createApp = async () => {
  return NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
};
const printStartResult = (err: Error, address: string): void => {
  if (err) {
    console.log(`Error during application start ${util.inspect(err)}`);
  } else {
    console.log(`Nest successfully started on ${address}`);
  }
};

bootstrap();
