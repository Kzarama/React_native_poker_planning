import { cards } from '@/shared/core/utils/Mocks';
import Card from '@/table/ui/components/atoms/Card';
import { useUserStore } from '@/user/core/store/useUserStore';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface IProps {
  vote: string | number;
}

export default function CardsView({ vote }: IProps) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const [selectedCard, setSelectedCard] = useState<number | string | undefined>(
    vote,
  );

  const handleVote = (vote: number | string) => {
    setSelectedCard(vote);
    setUserInfo({ ...userInfo, vote });
  };

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
