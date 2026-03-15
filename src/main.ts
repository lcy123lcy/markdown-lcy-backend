import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/http-exception.filter';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true });
  await app.listen(PORT, HOST);
  console.log(`Application is running on: http://${HOST}:${PORT}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
