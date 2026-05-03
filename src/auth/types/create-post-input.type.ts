import { CreatePostDto } from 'src/posts/dto';

export type CreatePostInput = CreatePostDto & {
  userId: number;
};
