import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  private async validatePostOwner(
    postId: number,
    userId: number,
  ): Promise<Post> {
    const post = await this.findById(postId);
    if (post.userId !== userId) throw new ForbiddenException('Not allowed');
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }

  async findById(id: number): Promise<Post> {
    return this.postsRepository.findById(id);
  }

  async findPostsByUserId(userId: number): Promise<Post[]> {
    return this.postsRepository.findByUserId(userId);
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postsRepository.create(createPostDto);
  }

  async update(
    postId: number,
    userId: number,
    dto: UpdatePostDto,
  ): Promise<Post> {
    await this.validatePostOwner(postId, userId);
    return this.postsRepository.update(postId, dto);
  }

  async remove(id: number, userId: number): Promise<string> {
    await this.validatePostOwner(id, userId);
    await this.postsRepository.delete(id);
    return `Removed #${id} post`;
  }
}
