import { cards } from '@/shared/core/utils/Mocks';
import { useTableStore } from '@/table/core/store/useTableStore';
import Card from '@/table/ui/components/atoms/Card';
import { useUserStore } from '@/user/core/store/useUserStore';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface IProps {
  vote: string | number;
  showScores: boolean;
}

export default function CardsView({ vote, showScores }: IProps) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const users = useTableStore((state) => state.users);

  const [selectedCard, setSelectedCard] = useState<number | string | undefined>(
    vote,
  );

  const handleVote = (vote: number | string) => {
    if (!showScores) {
      setSelectedCard(vote);
      setUserInfo({ ...userInfo, vote });
    }
  };

  if (showScores) {
    const usersResult = users
      .map(({ vote }) => (typeof vote === 'number' ? vote : 0))
      .reduce((sum, vote) => sum + vote, 0);

    const result =
      (typeof userInfo.vote === 'number'
        ? usersResult + userInfo.vote
        : usersResult) /
      (users.length + 1);

    let sumScores = [{ score: userInfo.vote, votes: 1 }];

    const sumScoresMap = new Map(
      sumScores.map(({ score, votes }) => [score, votes]),
    );

    users.forEach(({ vote }) => {
      sumScoresMap.set(vote, (sumScoresMap.get(vote) || 0) + 1);
    });

    sumScores = Array.from(sumScoresMap, ([score, votes]) => ({
      score,
      votes,
    })).sort((a, b) =>
      isNaN(Number(a.score)) || isNaN(Number(b.score))
        ? String(a.score).localeCompare(String(b.score), 'es', {
            sensitivity: 'base',
          })
        : Number(a.score) - Number(b.score),
    );

    return (
      <View className='px-4 flex-row items-center'>
        <ScrollView horizontal className='pb-3'>
          {sumScores.map(({ score, votes }, index) => (
            <View
              key={index}
              className='mx-2 items-center justify-center gap-2'
            >
              <Card score={score} active={false} selectCard={() => {}} />
              <Text className='text-white text-center'>
                {`${votes} ${votes === 1 ? 'Voto' : 'Votos'}`}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className='ml-4 gap-2'>
          <Text className='text-white'>Promedio</Text>
          <Text className='text-white text-center font-extrabold text-2xl'>
            {Number.isInteger(result) ? result.toString() : result.toFixed(1)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className='flex-1 gap-6 absolute bottom-6 w-[100vw]'>
      <Text className='text-white font-bold text-center'>
        Elige una carta 👇
      </Text>
      <ScrollView horizontal className='overflow-visible'>
        <View className='mx-4 mb-4 flex-row gap-4'>
          {cards.map((score) => (
            <Card
              key={score}
              score={score}
              active={selectedCard === score}
              selectCard={handleVote}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
