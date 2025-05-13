import { cards, mockPlayers } from '@/shared/core/utils/Mocks';
import { IUser } from '@/user/core/utils/interfaces';

export const addPlayer = (): IUser[] => {
  const positions = [
    '-top-[85]',
    'top-[60] left-[30]',
    'top-[150] left-[30]',
    'top-[240] left-[30]',
    'top-[60] right-[30]',
    'top-[150] right-[30]',
    'top-[240] right-[30]',
  ];

  return mockPlayers.map((player) => ({
    ...player,
    vote: undefined,
    visible: true,
    position: positions.sort(() => Math.random() - 0.5).pop(),
    userType: Math.random() < 0.1 ? 'viewer' : 'player',
  }));
};

export const vote = (users: IUser[]) => {
  const scores = cards;
  return users.map((player) => ({
    ...player,
    vote: scores[Math.floor(Math.random() * scores.length)],
  }));
};
