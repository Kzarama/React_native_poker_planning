import { useTableStore } from '@/table/core/store/useTableStore';
import Card from '@/table/ui/components/atoms/Card';
import { useUserStore } from '@/user/core/store/useUserStore';
import { ScrollView, Text, View } from 'react-native';

export default function VotesView() {
  const userInfo = useUserStore((state) => state.userInfo);
  const users = useTableStore((state) => state.users);

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
    <View className='px-4 flex-row items-center'>
      <ScrollView horizontal className='pb-3'>
        {getCardsInfo().map(({ score, votes }) => (
          <View key={score} className='mx-2 items-center justify-center gap-2'>
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
          {getAverage()}
        </Text>
      </View>
    </View>
  );
}
