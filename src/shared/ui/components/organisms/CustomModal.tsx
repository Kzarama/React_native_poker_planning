import { BlurView } from 'expo-blur';
import { Modal, Pressable } from 'react-native';

interface IProps {
  modalOpen: boolean;
  closeModal?: () => void;
  children: React.ReactNode;
}

export default function CustomModal({
  modalOpen,
  closeModal,
  children,
}: IProps) {
  return (
    <Modal transparent animationType='fade' visible={modalOpen}>
      <Pressable
        onPress={closeModal}
        className='flex-1 justify-center items-center'
      >
        <BlurView intensity={20} tint='dark' className='absolute inset-0' />

        <Pressable
          onPress={() => {}}
          className='bg-theme_dark_purple border border-theme_purple rounded-2xl p-6 w-[300px] gap-5 shadow-xl'
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
