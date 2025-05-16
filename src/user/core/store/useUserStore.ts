import { IUser } from '@/user/domain/userModel';
import { create } from 'zustand';

type userStore = {
  userInfo: IUser;
  setUserInfo: (userInfo: IUser) => void;
};

export const useUserStore = create<userStore>((set) => ({
  userInfo: {
    id: undefined,
    name: undefined,
    userType: 'player',
    vote: undefined,
    isAdmin: true,
    visible: true,
    position: {
      portrait: 'top-[370]',
      landscape: 'top-[60] right-[20]',
    },
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));
