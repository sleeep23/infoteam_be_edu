import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts = [
    { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
    { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
    { id: 3, title: 'Post 3', content: 'Content 3', userId: 3 },
  ];
  private nextId = 4;

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
    const post = this.findById(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException('Not allowed to update this post');
    }

    if (dto.title !== undefined) {
      post.title = dto.title;
    }

    if (dto.content !== undefined) {
      post.content = dto.content;
    }

    return post;
  }

  remove(id: number) {
    if (this.findPostsByUserId(id).length === 0) {
      throw new NotFoundException('Post not found');
    }
    this.posts = this.posts.filter((post) => post.id !== id);
    return `Removed #${id} post`;
  }
}
