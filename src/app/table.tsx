import PokerIcon from '@/shared/core/images/PokerIcon';
import { useStore } from '@/shared/core/store/useStore';
import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import ModalUser from '@/shared/ui/components/molecules/ModalUser';
import MyModal from '@/shared/ui/components/organisms/CustomModal';
import ScreenLayout from '@/shared/ui/components/templates/ScreenLayout';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function Table() {
  const [showShare, setShowShare] = useState(false);
  const userInfo = useStore((state) => state.userInfo);
  const tableName = useStore((state) => state.tableName);

  return (
    <ScreenLayout>
      <View className='flex-row items-center justify-between gap-3 mx-5'>
        <PokerIcon />
        <Text className='text-3xl font-extrabold text-white'>{tableName}</Text>
        <Pressable onPress={() => setShowShare(true)}>
          <View className='w-10 h-10 bg-theme_light_purple rounded-full items-center justify-center'>
            <Text className='font-bold text-theme_dark_purple'>
              {userInfo?.name.slice(2).toUpperCase()}
            </Text>
          </View>
        </Pressable>
      </View>

      <View className='w-[250] h-[470] p-2 border-2 rounded-full border-[#6429CD]'>
        <View className='w-[230] h-[450] p-2 border-2 rounded-full border-[#BDBDFF99]'>
          <View className='w-[210] h-[430] border-2 rounded-full border-[#3e1684]' />
        </View>
      </View>

      {!userInfo && <ModalUser />}
      {showShare && (
        <MyModal modalOpen={showShare}>
          <Text className='text-white text-3xl font-extrabold text-center'>
            {userInfo?.name}
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
        </MyModal>
      )}
    </ScreenLayout>
  );
}
