import { cards } from '@/shared/core/utils/Mocks';
import { useOrientation } from '@/table/core/hooks/useOrientation';
import Card from '@/table/ui/components/atoms/Card';
import { useUserStore } from '@/user/core/store/useUserStore';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

interface IProps {
  vote: string | number;
}

export default function CardsView({ vote }: IProps) {
  const orientation = useOrientation();
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
    <View
      className={`gap-6 items-center ${orientation === 'portrait' ? 'items-center w-full' : 'mr-24 shrink-0 flex-row'}`}
    >
      <Text
        className={`text-white font-bold text-center ${orientation === 'portrait' ? '' : 'w-[80]'}`}
      >
        {`Elige una carta ${orientation === 'portrait' ? '👇' : ' 👉'}`}
      </Text>

      <FlatList
        data={cards}
        key={orientation}
        keyExtractor={(item) => String(item)}
        horizontal={orientation === 'portrait'}
        {...(orientation !== 'portrait' && { numColumns: 2 })}
        renderItem={({ item }) => (
          <View className='m-2'>
            <Card
              score={item}
              active={selectedCard === item}
              selectCard={handleVote}
            />
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text className='text-white text-2xl font-bold text-center'>
              No hay Cartas
            </Text>
          </View>
        }
      />
    </View>
  );
}
