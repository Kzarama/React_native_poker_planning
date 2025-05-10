import MyModal from '@shared/ui/molecules/MyModal';
import { ScreenLayout } from '@shared/ui/templates/ScreenLayout';
import React from 'react';
import { Text, View } from 'react-native';

export default function Table() {
  return (
    <ScreenLayout>
      <Text className='text-white'>hola</Text>
      <MyModal />
    </ScreenLayout>
  );
}
