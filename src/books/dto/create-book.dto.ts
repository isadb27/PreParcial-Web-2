import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title!: string;

  @IsInt()
  @Min(0)
  @Max(20)
  availableCopies!: number;

  @IsInt()
  @Min(1)
  categoryId!: number;
}