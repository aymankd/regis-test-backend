import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

const port = parseInt(process.env.PORT) || 3000;
const globalPrefix = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalFilters(new MongoExceptionFilter())
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
