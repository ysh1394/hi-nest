import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// PartialType 인자에 타입을 상속하고 싶은 dto를 넣으면 되고, 필수 값이 아님?
