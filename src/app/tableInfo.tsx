import PokerIcon from '@/shared/core/images/PokerIcon';
import ScreenLayout from '@/shared/ui/components/templates/ScreenLayout';
import { useTableStore } from '@/table/core/store/useTableStore';
import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function TableInfo() {
  const tableName = useTableStore((state) => state.tableName);
  const setTableName = useTableStore((state) => state.setTableName);

  return (
    <ScreenLayout>
      <View className='flex-row items-center gap-3 ml-6'>
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
        <Link href='/table' asChild>
          <Pressable
            className='py-2 px-4 rounded-[100] bg-white font-bold
          disabled:text-white disabled:bg-theme_purple disabled:opacity-40'
            disabled={!tableName}
          >
            <Text
              className='text-gray-800 disabled:text-white'
              disabled={!tableName}
            >
              Crear partida
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScreenLayout>
  );
}
