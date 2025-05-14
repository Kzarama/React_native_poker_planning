import { IUser } from '@/user/domain/userModel';
import { create } from 'zustand';

type userStore = {
  userInfo: IUser | undefined;
  setUserInfo: (userInfo: IUser) => void;
};

export const useUserStore = create<userStore>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
