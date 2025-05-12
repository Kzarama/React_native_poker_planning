import { IUser } from '@/user/core/utils/interfaces';
import { create } from 'zustand';

type tableStore = {
  tableName: string;
  setTableName: (tableName: string) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
};

export const useTableStore = create<tableStore>((set) => ({
  tableName: '',
  setTableName: (tableName) => set({ tableName }),
  users: [],
  setUsers: (users) => set({ users }),
}));
