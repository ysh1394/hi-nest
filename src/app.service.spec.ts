import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('MoviesService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('home', () => {
    it('should return an string', () => {
      const result = typeof service.getHello();
      expect(result).toBe('string');
    });
  });
});
