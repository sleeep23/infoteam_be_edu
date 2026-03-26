import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UserIdQueryDto {
  @IsInt()
  @Type(() => Number)
  userId: number;
}

export class FindPostsQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;
}

export class UpdatePostQueryDto extends UserIdQueryDto {}
export class DeletePostQueryDto extends UserIdQueryDto {}
