import { randomLetters } from '@/shared/core/utils/textFunctions';

export const generateTableLink = () => {
  return `https://pragmapoker.com/${randomLetters(12)}`;
};
