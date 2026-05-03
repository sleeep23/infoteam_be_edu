import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/src/prisma.service';
import { UpdatePostDto } from 'src/posts/dto';
import { Post } from './entities/post.entity';
import { CreatePostInput } from 'src/auth/types/create-post-input.type';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  findById(id: number): Promise<Post> {
    return this.prisma.post.findUniqueOrThrow({
      where: { id },
    });
  }

  findByUserId(userId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { userId },
    });
  }

  create(dto: CreatePostInput): Promise<Post> {
    return this.prisma.post.create({
      data: dto,
    });
  }

  update(id: number, dto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
