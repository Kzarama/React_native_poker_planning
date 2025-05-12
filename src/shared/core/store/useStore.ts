import { IUser } from 'user/interfaces';
import { create } from 'zustand';

type store = {
  tableName: string;
  setTableName: (tableName: string) => void;
  userInfo: IUser | undefined;
  setUserInfo: (userInfo: IUser) => void;
};

export const useStore = create<store>((set) => ({
  tableName: '',
  setTableName: (tableName) => set({ tableName }),
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
