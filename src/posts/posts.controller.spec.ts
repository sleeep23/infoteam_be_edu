import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;

  const mockPostsService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findPostsByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    jest.clearAllMocks();
  });

  // 컨트롤러 선언
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAll -> 전체 목록 호출
  it('should return all posts when userId is not provided', () => {
    const result = [
      { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
      { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
      { id: 3, title: 'Post 3', content: 'Content 3', userId: 3 },
    ];

    // 컨트롤러에 집중된 테스트를 위해 service의 응답 결과를 mock 데이터로 설정해둔 것.
    mockPostsService.findAll.mockReturnValue(result);

    expect(controller.findAll()).toBe(result);
    expect(mockPostsService.findAll).toHaveBeenCalledTimes(1);
  });

  // findAll + userId 제공 -> 해당 유저의 포스트들 정보 반환해야됨
  it('should return posts by userId when userId is provided', () => {
    const result = [
      { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
    ];
    mockPostsService.findPostsByUserId.mockReturnValue(result);

    expect(controller.findAll('1')).toBe(result);
    expect(mockPostsService.findPostsByUserId).toHaveBeenCalledTimes(1);
  });

  // postId 제공 -> 해당 포스트 정보 가져오기
  it('should return post by postId when postId is provided', () => {
    const result = { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 };
    mockPostsService.findById.mockReturnValue(result);

    const post = controller.findById('1');

    expect(post).toEqual(result);
    expect(post.userId).toBe(1);
    expect(mockPostsService.findById).toHaveBeenCalledTimes(1);
    expect(mockPostsService.findById).toHaveBeenCalledWith(1);
  });

  // create post
  it('should create and return created post', () => {
    const createdPost = [
      { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
    ];
    mockPostsService.create.mockReturnValue(createdPost);
    expect(controller.create(createdPost[0])).toBe(createdPost);
    expect(mockPostsService.create).toHaveBeenCalledTimes(1);
  });

  // update post
  it('should update and return updated post', () => {
    const dto: UpdatePostDto = {
      title: 'Updated Title',
    };
    const updatedPost = {
      id: 1,
      title: 'Updated Post 1',
      content: 'Content 1',
      userId: 1,
    };
    mockPostsService.update.mockReturnValue(updatedPost);
    expect(controller.update('1', '1', dto)).toEqual(updatedPost); // 객체라서 비교할 때 eqaul 써야함
    expect(mockPostsService.update).toHaveBeenCalledTimes(1);
  });

  // remove post
  it('should remove and return removed post', () => {
    mockPostsService.remove.mockReturnValue('Removed #1 post');
    expect(controller.remove('1')).toBe('Removed #1 post');
    expect(mockPostsService.remove).toHaveBeenLastCalledWith(1);
    expect(mockPostsService.remove).toHaveBeenCalledTimes(1);
  });
});
