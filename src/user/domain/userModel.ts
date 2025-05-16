export interface IUser {
  id: string;
  name: string;
  userType: UserType;
  isAdmin?: boolean;
  vote: number | string;
  visible: boolean;
  position: { portrait: string; landscape: string };
}

export type UserType = 'player' | 'viewer';
