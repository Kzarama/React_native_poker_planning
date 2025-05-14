import { verifyText } from '@/shared/core/utils/textFunctions';
import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import RadioGroup from '@/shared/ui/components/molecules/RadioGroup';
import MyModal from '@/shared/ui/components/organisms/CustomModal';
import { useUserStore } from '@/user/core/store/useUserStore';
import { IUser, UserType } from '@/user/domain/userModel';
import { useMemo, useState } from 'react';
import { Text, TextInput } from 'react-native';

export default function ModalUser() {
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const [error, setError] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(true);

  const setUserInfoStore = useUserStore((state) => state.setUserInfo);

  const setName = (name: string) => setUserInfo((prev) => ({ ...prev, name }));

  const setUserType = (userType: UserType) =>
    setUserInfo((prev) => ({ ...prev, userType, isAdmin: true }));

  const handleContinue = () => {
    setUserInfoStore(userInfo);
    setModalOpen(false);
  };

  const checkDisabledButton = useMemo(() => {
    if (!userInfo?.name) return true;

    const textError = verifyText(userInfo?.name);
    setError(textError);

    return Boolean(textError);
  }, [userInfo]);

  return (
    <MyModal modalOpen={modalOpen}>
      <Text className='text-white font-semibold'>Tu nombre</Text>
      <TextInput
        className='border border-theme_purple rounded-full px-4 py-2 text-white'
        placeholderTextColor='#aaa'
        onChangeText={setName}
      />

      {error && <Text className='text-red-400 text-center'>{error}</Text>}

      <RadioGroup
        buttonsInfo={[
          { label: 'Jugador', value: 'player' },
          { label: 'Espectador', value: 'viewer' },
        ]}
        setValue={setUserType}
      />
      <CustomButton
        className='w-[100] self-center'
        text='Continuar'
        disabled={checkDisabledButton}
        action={handleContinue}
      />
    </MyModal>
  );
}
