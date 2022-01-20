import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // 보내면 안되는 값에 대해서 에러 문구를 던짐
      transform: true, // url에서 넘어오는 id 값은 string인데 entity에 정의한 값에 맞춰서 타입을 변환해서 내려주는 기능
    }),
  ); // dto에서 post, put, patch 등의 검증을 할 수 있는 코드
  await app.listen(3000);
}
bootstrap();
