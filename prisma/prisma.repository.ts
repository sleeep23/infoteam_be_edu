import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePostDto, UpdatePostDto } from 'src/posts/dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany();
  }

  findById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  findByUserId(userId: number) {
    return this.prisma.post.findMany({
      where: { userId },
    });
  }

  create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: dto,
    });
  }

  update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
