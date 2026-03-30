import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PostsRepository } from './prisma.repository';

@Module({
  providers: [PrismaService, PostsRepository],
  exports: [PostsRepository],
})
export class PrismaModule {}
