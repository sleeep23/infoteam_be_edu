import { OAuthProvider } from '../dto';

export type JwtPayload = {
  sub: number;
  email?: string;
  provider: OAuthProvider;
};
