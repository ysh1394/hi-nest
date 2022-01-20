import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movies: MovieRepository,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movies.find();
  }

  async search(query: object): Promise<Movie[]> {
    const allData = await this.getAll();
    // const filter = await allData.
    console.log('year >>>', query);

    return allData;
  }

  async getOne(id: number): Promise<Movie> {
    const detailData = await this.movies.findOne(id);
    if (!detailData) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return detailData;
  }

  async create(data: CreateMovieDto): Promise<Movie> {
    const allData = await this.getAll();
    const newData = await this.movies.create({
      id: allData.length + 1,
      ...data,
    });
    await this.movies.save(newData);
    return newData;
  }

  async deleteOne(id: number): Promise<string> {
    try {
      const data = await this.getOne(id);
      await this.movies.remove(data);
      return `remove id ${id}`;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(id: number, updateData: UpdateMovieDto): Promise<string> {
    try {
      await this.movies.update(id, { ...updateData });
      return `update id ${id}`;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
