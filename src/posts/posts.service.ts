import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
    { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
    { id: 3, title: 'Post 3', content: 'Content 3', userId: 3 },
  ];
  private nextId = 4;

  private validatePostOwner(postId: number, userId: number): Post {
    const post = this.findById(postId); // NotFoundException 자동 처리
    if (post.userId !== userId) {
      throw new ForbiddenException('Not allowed');
    }
    return post;
  }

  findAll() {
    return this.posts;
  }

  findById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  findPostsByUserId(userId: number) {
    return this.posts.filter((post) => post.userId === userId);
  }

  create(createPostDto: CreatePostDto) {
    const newPost = {
      id: this.nextId++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(postId: number, userId: number, dto: UpdatePostDto) {
    const post = this.validatePostOwner(postId, userId);

    if (dto.title !== undefined) {
      post.title = dto.title;
    }

    if (dto.content !== undefined) {
      post.content = dto.content;
    }

    return post;
  }

  remove(id: number, userId: number) {
    this.validatePostOwner(id, userId);
    this.posts = this.posts.filter((p) => p.id !== id);
    return `Removed #${id} post`;
  }
}
