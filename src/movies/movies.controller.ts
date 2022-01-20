import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  // express 방식으로도 호출 할 수 있음 (아래 예시) -> Nest js는 express와 fastify 위에서 돌아가는 프레임워크이기 때문에 가능 하지만 두개의 이점을 가지기 위해서는 Nest js 문법으로하는게 좋음
  // @Get()
  // getAll(@Req() req, @Res() res): Movie[] {
  //   return res.json();
  // }

  @Get('/search') // Get이 동적 Get보다 밑에 있으면 /:id 중 하나로 읽으므로 위에서 선언해 줄 것
  async search(@Query() query: object): Promise<Movie[]> {
    return this.moviesService.search(query);
  }
  // @Get('/search') // Get이 동적 Get보다 밑에 있으면 /:id 중 하나로 읽으므로 위에서 선언해 줄 것
  // search(@Query('year') year: number) {
  //   return this.moviesService.search(year);
  // }

  @Get('/:id') // @Get에서의 동적 url과 @Param의 인자는 같아야함
  getOne(@Param('id') movieId: number): Promise<Movie> {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // Patch : 리소스의 일부분만 업데이트 할 떄 사용
  // Put : 리소스의 전체를 업데이트 할 떄 사용
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
