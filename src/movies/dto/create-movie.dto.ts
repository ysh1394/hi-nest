import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 값이 없어도 오류가 안나도록
  @IsString({ each: true }) // each : 모든 요소를 다 검사한다는 뜻
  readonly genres: string[];
}
