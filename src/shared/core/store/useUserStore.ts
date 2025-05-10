// store/useUserStore.ts
import { create } from 'zustand';

type UserStore = {
  tableName: string;
  setTableName: (tableName: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  tableName: '',
  setTableName: (tableName) => set({ tableName }),
}));
