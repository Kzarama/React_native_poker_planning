import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MyCheckbox from '../atoms/MyCheckbox';

export default function MyModal() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal transparent animationType='fade' visible={modalVisible}>
      <View className='flex-1 justify-center items-center'>
        <BlurView intensity={20} tint='dark' style={StyleSheet.absoluteFill} />

        <View className='bg-[#1e0033] border border-purple-500 rounded-2xl p-6 shadow-xl w-80'>
          <Text className='text-white mb-2 text-center font-semibold'>
            Tu nombre
          </Text>
          <TextInput
            className='border border-purple-500 rounded-full px-4 py-2 text-white mb-4'
            placeholder='Ingresa tu nombre'
            placeholderTextColor='#aaa'
          />

          <View className='flex-row justify-between mb-6'>
            <MyCheckbox text='Jugador' />
            <MyCheckbox text='Espectador' />
          </View>

          <TouchableOpacity className='bg-white/10 px-4 py-2 rounded-full opacity-50'>
            <Text className='text-white text-center'>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
