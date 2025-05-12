import PokerIcon from '@/shared/core/images/PokerIcon';
import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import CustomModal from '@/shared/ui/components/organisms/CustomModal';
import RoundedName from '@/user/ui/components/atoms/RoundedName';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface IProps {
  tableName: string;
  userName: string;
}

export default function HeaderTable({ tableName, userName }: IProps) {
  const [showShare, setShowShare] = useState(false);

  return (
    <View className='flex-row items-center justify-between gap-3 mx-5'>
      <PokerIcon />
      <Text className='text-3xl font-extrabold text-white'>{tableName}</Text>
      <Pressable onPress={() => setShowShare(true)}>
        <RoundedName text={userName} />
      </Pressable>

      {showShare && (
        <CustomModal modalOpen={showShare}>
          <Text className='text-white text-3xl font-extrabold text-center'>
            {userName}
          </Text>

          <CustomButton
            className='w-[200] self-center'
            text='Invitar Jugadores'
            action={() => {}}
          />

          <CustomButton
            className='w-[200] self-center'
            text='Cerrar'
            action={() => setShowShare(false)}
          />
        </CustomModal>
      )}
    </View>
  );
}
