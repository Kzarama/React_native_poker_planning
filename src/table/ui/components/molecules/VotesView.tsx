import { useOrientation } from '@/table/core/hooks/useOrientation';
import { useTableStore } from '@/table/core/store/useTableStore';
import Card from '@/table/ui/components/atoms/Card';
import { useUserStore } from '@/user/core/store/useUserStore';
import { FlatList, Text, View } from 'react-native';

export default function VotesView() {
  const userInfo = useUserStore((state) => state.userInfo);
  const users = useTableStore((state) => state.users);
  const orientation = useOrientation();

  const votingUsers = [
    ...users.filter(({ userType }) => userType === 'player'),
    ...(userInfo.userType === 'player' ? [userInfo] : []),
  ];

  const getAverage = () => {
    const playerVotesSum = votingUsers.reduce(
      (sum, { vote }) => sum + (typeof vote === 'number' ? vote : 0),
      0,
    );

    const result = playerVotesSum / votingUsers.length;
    return Number.isInteger(result) ? result.toString() : result.toFixed(1);
  };

  const getCardsInfo = () => {
    const voteCounts = new Map<number | string, number>();

    votingUsers.forEach(({ vote }) => {
      voteCounts.set(vote, (voteCounts.get(vote) || 0) + 1);
    });

    return Array.from(voteCounts, ([score, votes]) => ({
      score,
      votes,
    })).sort((a, b) =>
      isNaN(Number(a.score)) || isNaN(Number(b.score))
        ? String(a.score).localeCompare(String(b.score), 'es', {
            sensitivity: 'base',
          })
        : Number(a.score) - Number(b.score),
    );
  };

  return (
    <View
      className={`items-center ${orientation === 'portrait' ? 'px-4 flex-row' : 'mr-24 shrink-0 flex-col w-[210] gap-5'}`}
    >
      <FlatList
        data={getCardsInfo()}
        key={orientation}
        keyExtractor={(item) => String(item.score)}
        horizontal={orientation === 'portrait'}
        {...(orientation !== 'portrait' && { numColumns: 2 })}
        renderItem={({ item }) => (
          <View className='mx-2 my-1 gap-1 grow justify-center items-center'>
            <Card score={item.score} active={false} selectCard={() => {}} />
            <Text className='text-white text-center'>
              {`${item.votes} ${item.votes === 1 ? 'Voto' : 'Votos'}`}
            </Text>
          </View>
        )}
      />

      <View className='ml-4 gap-2'>
        <Text className='text-white'>Promedio</Text>
        <Text className='text-white text-center font-extrabold text-2xl'>
          {getAverage()}
        </Text>
      </View>
    </View>
  );
}
