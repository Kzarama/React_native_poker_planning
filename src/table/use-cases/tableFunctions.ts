import { cards, mockPlayers } from '@/shared/core/utils/Mocks';
import { IUser } from '@/user/domain/userModel';

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

  const positionsLandscape = [
    'top-[60] left-[30]',
    '-top-[85] left-[170]',
    '-top-[85] left-[245]',
    '-top-[85] left-[320]',
    'top-[190] left-[170]',
    'top-[190] left-[245]',
    'top-[190] left-[320]',
  ];

  return mockPlayers.map((player) => ({
    ...player,
    vote: undefined,
    visible: true,
    position: {
      portrait: positions.sort(() => Math.random() - 0.5).pop(),
      landscape: positionsLandscape.sort(() => Math.random() - 0.5).pop(),
    },
    userType: Math.random() < 0.1 ? 'viewer' : 'player',
  }));
};

export const vote = (users: IUser[]) => {
  const scores = cards;
  return users.map((player) => ({
    ...player,
    vote:
      player.userType !== 'viewer' &&
      scores[Math.floor(Math.random() * scores.length)],
  }));
};

export const resetPlayers = (users: IUser[]): IUser[] => {
  return users.map((player) => ({
    ...player,
    vote: undefined,
  }));
};

export const changeAdminRole = (users: IUser[], user: IUser) => {
  users.forEach((u) => {
    if (u.isAdmin) {
      u.isAdmin = false;
    }
  });

  const target = users.find((u) => u.id === user.id);
  if (target) {
    target.isAdmin = true;
  } else {
    user.isAdmin = true;
    users.push(user);
  }

  return users;
};
