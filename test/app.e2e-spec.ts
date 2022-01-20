import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeAll : 매번 Create하고 getHttpServer()를 안하게 해주는 메소드
  beforeAll(async () => {
    // beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // useGlobalPipes: 아래 내용은 테스트 환경도 main.ts와 동일한 환경으로 구성해야함
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // 보내면 안되는 값에 대해서 에러 문구를 던짐
        transform: true, // url에서 넘어오는 id 값은 string인데 entity에 정의한 값에 맞춰서 타입을 변환해서 내려주는 기능
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Nest API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'things....',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .send({
          title: 'Updated Test',
        })
        .expect(200);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it.todo('ALL COMPLETE!');
  });
});
