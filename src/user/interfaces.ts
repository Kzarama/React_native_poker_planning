export interface IUser {
  name: string;
  userType: UserType;
}

export type UserType = 'player' | 'viewer';
