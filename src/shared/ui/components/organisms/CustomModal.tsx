import { useState, useEffect } from 'react';
import { useOrientation } from '@/table/core/hooks/useOrientation';
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
  const orientation = useOrientation();

  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [orientation]);

  return (
    <Modal
      transparent
      animationType='fade'
      visible={modalOpen}
      onRequestClose={closeModal}
      supportedOrientations={['portrait', 'landscape']}
    >
      <Pressable
        onPress={closeModal}
        className='flex-1 justify-center items-center'
      >
        <BlurView intensity={20} tint='dark' className='absolute inset-0' />

        <Pressable
          key={renderKey}
          className={
            'bg-theme_dark_purple border border-theme_purple rounded-2xl p-6 gap-5 shadow-xl w-[300] h-[250] justify-center'
          }
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
