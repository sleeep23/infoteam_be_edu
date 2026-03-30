import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UserIdQueryDto {
  @ApiProperty({
    example: 1,
    description: '유저 ID',
  })
  @IsInt()
  @Type(() => Number)
  userId: number;
}

export class FindPostsQueryDto {
  @ApiPropertyOptional({
    example: 1,
    description: '특정 유저의 게시글만 조회할 때 사용하는 유저 ID',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number;
}

export class UpdatePostQueryDto extends UserIdQueryDto {}
export class DeletePostQueryDto extends UserIdQueryDto {}
