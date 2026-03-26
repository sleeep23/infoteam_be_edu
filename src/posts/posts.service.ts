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
  private posts: Post[] = [
    { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
    { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
    { id: 3, title: 'Post 3', content: 'Content 3', userId: 3 },
  ];
  private nextId = 4;

  private validatePostOwner(postId: number, userId: number): Post {
    const post = this.findById(postId);
    if (post.userId !== userId) {
      throw new ForbiddenException('Not allowed');
    }
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findById(id: number): Post {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  findPostsByUserId(userId: number): Post[] {
    return this.posts.filter((post) => post.userId === userId);
  }

  create(createPostDto: CreatePostDto): Post {
    const newPost = {
      id: this.nextId++,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(postId: number, userId: number, dto: UpdatePostDto): Post {
    const post = this.validatePostOwner(postId, userId);

    if (dto.title !== undefined) {
      post.title = dto.title;
    }

    if (dto.content !== undefined) {
      post.content = dto.content;
    }

    return post;
  }

  remove(id: number, userId: number): string {
    this.validatePostOwner(id, userId);
    this.posts = this.posts.filter((p) => p.id !== id);
    return `Removed #${id} post`;
  }
}
