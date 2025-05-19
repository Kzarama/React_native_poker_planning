import { IUser } from '@/user/domain/userModel';
import RoundedName from '@/user/ui/components/atoms/RoundedName';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ModalAdmin from './ModalAdmin';

interface IProps {
  user: IUser;
  showScores?: boolean;
  position: string;
}

export function UserView({ user, showScores, position }: IProps) {
  const [showIsAdmin, setShowIsAdmin] = useState(false);

  const getUserViewType = () => {
    if (user.userType === 'player') {
      if (user.vote !== undefined && !showScores) return 'active';
    } else {
      return 'viewer';
    }
  };

  switch (getUserViewType()) {
    case 'viewer':
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <RoundedName text={user.name} />
          <Text className='text-white'>{user.name}</Text>
        </View>
      );
    case 'active':
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <View className='w-10 h-16 bg-theme_purple rounded-md items-center justify-center'>
            {showScores && <Text>{user.vote}</Text>}
          </View>
          <Text className='text-white'>{user.name}</Text>
        </View>
      );
    default:
      return (
        <View className={`absolute items-center gap-2 ${position}`}>
          <Pressable
            onPress={() => setShowIsAdmin(true)}
            className={`items-center gap-2`}
          >
            <View className='w-10 h-16 border border-theme_purple rounded-md items-center justify-center'>
              {showScores && <Text className='text-white'>{user.vote}</Text>}
            </View>
            <Text className='text-white'>{user.name}</Text>
          </Pressable>

          <ModalAdmin
            user={user}
            showIsAdmin={showIsAdmin}
            setShowIsAdmin={setShowIsAdmin}
          />
        </View>
      );
  }
}
