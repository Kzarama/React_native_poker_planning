import RoundedName from '@/user/ui/components/atoms/RoundedName';
import { Text, View } from 'react-native';

interface IProps {
  userName: string;
  score?: string | number;
  showScore?: boolean;
  position: string;
  type?: 'user' | 'active';
}

export function UserView({
  userName,
  score,
  showScore,
  position,
  type,
}: IProps) {
  switch (type) {
    case 'user':
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <RoundedName text={userName} />
          <Text className='text-white'>{userName}</Text>
        </View>
      );
    case 'active':
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <View className='w-10 h-16 bg-theme_purple rounded-md items-center justify-center'>
            {showScore && <Text>{score}</Text>}
          </View>
          <Text className='text-white'>{userName}</Text>
        </View>
      );
    default:
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <View className='w-10 h-16 border border-theme_purple rounded-md items-center justify-center'>
            {showScore && <Text className='text-white'>{score}</Text>}
          </View>
          <Text className='text-white'>{userName}</Text>
        </View>
      );
  }
}
