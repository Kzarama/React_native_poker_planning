import { Text, View } from 'react-native';

interface IProps {
  text: string;
}

export default function RoundedName({ text }: IProps) {
  return (
    <View className='w-[40] h-[40] bg-theme_light_purple rounded-full items-center justify-center'>
      <Text className='font-bold text-theme_dark_purple'>
        {text?.slice(0, 2).toUpperCase()}
      </Text>
    </View>
  );
}
