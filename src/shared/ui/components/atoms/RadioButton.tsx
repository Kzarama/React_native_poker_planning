import { IRadioSelected } from '@/shared/core/utils/interfaces';
import { Pressable, Text, View } from 'react-native';

interface IProps {
  radioInfo: IRadioSelected;
  radioSelected: IRadioSelected | undefined;
  selectValue: (selected: IRadioSelected) => void;
}

export default function RadioButton({
  radioInfo,
  radioSelected,
  selectValue,
}: IProps) {
  const handlePress = () => selectValue(radioInfo);

  return (
    <Pressable
      onPress={handlePress}
      className='flex-row items-center space-x-2 gap-2'
    >
      <Text className='text-white'>{radioInfo.label}</Text>
      <View
        className={`w-5 h-5 border rounded-full border-theme_purple items-center justify-center`}
      >
        {radioInfo.value === radioSelected?.value && (
          <View className='bg-theme_purple w-2 h-2 rounded-full' />
        )}
      </View>
    </Pressable>
  );
}
