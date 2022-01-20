import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MoviesModule],
  controllers: [AppController], // express 에서 route 같은 기능만 넣음
  providers: [AppService], // service는 비즈니스 로직
})
export class AppModule {}
