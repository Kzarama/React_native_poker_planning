import PokerIcon from '@/shared/core/images/PokerIcon';
import { verifyText } from '@/shared/core/utils/textFunctions';
import ScreenLayout from '@/shared/ui/components/templates/ScreenLayout';
import { useOrientation } from '@/table/core/hooks/useOrientation';
import { useTableStore } from '@/table/core/store/useTableStore';
import { Link } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function TableInfo() {
  const [error, setError] = useState(undefined);
  const orientation = useOrientation();

  const tableName = useTableStore((state) => state.tableName);
  const setTableName = useTableStore((state) => state.setTableName);

  const checkDisabledButton = useMemo(() => {
    if (!tableName) return true;

    const textError = verifyText(tableName);
    setError(textError);

    return Boolean(textError);
  }, [tableName]);

  return (
    <ScreenLayout>
      <View
        className={`flex-row items-center gap-3 ${orientation === 'portrait' ? 'ml-6' : 'ml-28'}`}
      >
        <PokerIcon />
        <Text className='text-xl text-white'>Crear partida</Text>
      </View>

      <View className='flex-1 items-center justify-center gap-4'>
        <Text className='text-white font-bold'>Nombre de la partida</Text>
        <TextInput
          value={tableName}
          onChangeText={setTableName}
          className='text-white border font-bold border-theme_purple w-2/4 rounded-[20] py-1 px-2'
        />

        {error && <Text className='text-red-400 text-center'>{error}</Text>}

        <Link href='/table' asChild>
          <Pressable
            className='py-2 px-4 rounded-[100] bg-white font-bold
          disabled:text-white disabled:bg-theme_purple disabled:opacity-40'
            disabled={checkDisabledButton}
          >
            <Text
              className='text-gray-800 disabled:text-white'
              disabled={checkDisabledButton}
            >
              Crear partida
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScreenLayout>
  );
}
