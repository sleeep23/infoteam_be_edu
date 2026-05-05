import { OAuthProvider } from '../dto';

/**
 * TODO: 실제 OAuth spec과 대조해서 받아오는 user의 구조를 확인하고 적용 필요!
 */

export type OAuthUser = {
  id: number;
  email: string;
  name?: string | null;
  profileImage?: string | null;
  provider: OAuthProvider;
  providerId: string;
};
