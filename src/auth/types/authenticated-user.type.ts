import { OAuthProvider } from '../dto';

export type AuthenticatedUser = {
  id: number;
  email?: string;
  provider: OAuthProvider;
};
