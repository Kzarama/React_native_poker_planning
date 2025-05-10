import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function MyCheckbox({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      className='flex-row items-center space-x-2 gap-2'
    >
      <Text className='text-white'>{text}</Text>
      <View
        className={`w-5 h-5 border rounded-full border-purple-600 items-center justify-center`}
      >
        {checked && <View className='bg-purple-600 w-2 h-2 rounded-full' />}
      </View>
    </Pressable>
  );
}
