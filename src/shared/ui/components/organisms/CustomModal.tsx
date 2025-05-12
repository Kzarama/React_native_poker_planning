import { BlurView } from 'expo-blur';
import { Modal, StyleSheet, View } from 'react-native';

interface IProps {
  modalOpen: boolean;
  children: any;
}

export default function CustomModal({ modalOpen, children }: IProps) {
  return (
    <Modal transparent animationType='fade' visible={modalOpen}>
      <View className='flex-1 justify-center items-center'>
        <BlurView intensity={20} tint='dark' style={StyleSheet.absoluteFill} />
        <View className='bg-theme_dark_purple border border-theme_purple rounded-2xl p-6 shadow-xl w-[300] gap-5'>
          {children}
        </View>
      </View>
    </Modal>
  );
}
