import PokerIcon from '@/shared/core/images/PokerIcon';
import Pragma from '@/shared/core/images/Pragma';
import ScreenLayout from '@/shared/ui/components/templates/ScreenLayout';
import { useTableStore } from '@/table/core/store/useTableStore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();
  const tableName = useTableStore((state) => state.tableName);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.navigate(tableName ? '/table' : '/tableInfo');
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
