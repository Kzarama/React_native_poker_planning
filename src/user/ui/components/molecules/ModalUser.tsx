import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import RadioGroup from '@/shared/ui/components/molecules/RadioGroup';
import MyModal from '@/shared/ui/components/organisms/CustomModal';
import { useUserStore } from '@/user/core/store/useUserStore';
import { useMemo, useState } from 'react';
import { Text, TextInput } from 'react-native';
import { IUser, UserType } from 'user/core/utils/interfaces';

export default function ModalUser() {
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const [error, setError] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(true);

  const setUserInfoStore = useUserStore((state) => state.setUserInfo);

  const setName = (name: string) => setUserInfo((prev) => ({ ...prev, name }));

  const setUserType = (userType: UserType) =>
    setUserInfo((prev) => ({ ...prev, userType, userRole: 'owner' }));

  const handleContinue = () => {
    setUserInfoStore(userInfo);
    setModalOpen(false);
  };

  const checkDisabledButton = useMemo(() => {
    setError(undefined);
    const hasSpecialChar = /[_.,*#\/\-]/.test(userInfo?.name);
    const digits = (userInfo?.name?.match(/\d/g) || []).length;

    if (userInfo?.name?.length < 5 || userInfo?.name?.length > 20) {
      setError('Debe tener entre 5 y 20 caracteres.');
    } else if (hasSpecialChar) {
      setError('No puede contener caracteres especiales.');
    } else if (digits > 3) {
      setError('Máximo 3 números permitidos.');
    } else if (/^\d+$/.test(userInfo?.name)) {
      setError('No puede ser solo números.');
    }

    return !(
      !error &&
      userInfo?.name &&
      userInfo?.name !== '' &&
      userInfo?.userType
    );
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
