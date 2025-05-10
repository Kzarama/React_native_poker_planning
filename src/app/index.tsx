import PokerIcon from '@shared/core/images/PokerIcon';
import Pragma from '@shared/core/images/Pragma';
import { ScreenLayout } from '@shared/ui/templates/ScreenLayout';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.navigate('/tableInfo');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ScreenLayout>
      <View className='px-[20] flex-1 items-center justify-center gap-5'>
        <PokerIcon />
        <Pragma />
      </View>
    </ScreenLayout>
  );
}
