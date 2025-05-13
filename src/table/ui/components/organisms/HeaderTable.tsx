import PokerIcon from '@/shared/core/images/PokerIcon';
import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import CustomModal from '@/shared/ui/components/organisms/CustomModal';
import { generateTableLink } from '@/table/use-cases/linkFunctions';
import RoundedName from '@/user/ui/components/atoms/RoundedName';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface IProps {
  tableName: string;
  userName: string;
}

export default function HeaderTable({ tableName, userName }: IProps) {
  const [showShare, setShowShare] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const tableLink = generateTableLink();

  const copyLink = () => {
    Clipboard.setStringAsync(tableLink);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 1500);
  };

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

          <Text
            numberOfLines={1}
            className='p-3 border text-white border-theme_purple rounded-xl'
          >
            {tableLink}
          </Text>

          {copiedText && (
            <Text className='text-green-400 text-center'>
              Copiado con éxito!
            </Text>
          )}

          <CustomButton
            className='w-[200] self-center'
            text='Copiar link'
            action={copyLink}
            variable='purple'
          />

          <CustomButton
            className='w-[200] self-center'
            text='Cerrar'
            action={() => setShowShare(false)}
            variable='transparent'
          />
        </CustomModal>
      )}
    </View>
  );
}
