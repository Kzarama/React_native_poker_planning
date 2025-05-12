export interface IUser {
  id: string;
  name: string;
  userType: UserType;
  userRole: UserRole;
  vote: number | string;
  visible: boolean;
  position: string;
}

export type UserType = 'player' | 'viewer';
export type UserRole = 'player' | 'owner';
