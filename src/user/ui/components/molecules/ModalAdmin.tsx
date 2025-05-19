import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import CustomModal from '@/shared/ui/components/organisms/CustomModal';
import { useTableStore } from '@/table/core/store/useTableStore';
import { changeAdminRole } from '@/table/use-cases/tableFunctions';
import { useUserStore } from '@/user/core/store/useUserStore';
import { Text, View } from 'react-native';

export default function ModalAdmin({ user, showIsAdmin, setShowIsAdmin }) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const users = useTableStore((state) => state.users);
  const setUsers = useTableStore((state) => state.setUsers);

  const handleRole = () => {
    if (user.id === userInfo.id) {
      setUsers(changeAdminRole(users, user));
      setUserInfo({ ...userInfo, isAdmin: true });
    } else {
      setUsers(changeAdminRole(users, user));
      setUserInfo({ ...userInfo, isAdmin: false });
    }
    setShowIsAdmin(false);
  };

  return (
    <CustomModal
      modalOpen={showIsAdmin}
      closeModal={() => setShowIsAdmin(false)}
    >
      <View className='items-center gap-2'>
        <Text className='text-white text-3xl font-bold mb-5'>{user.name}</Text>
        {user.isAdmin ? (
          <View>
            <Text className='text-white'>Este jugador ya es administrador</Text>
          </View>
        ) : (
          <CustomButton
            text='Volver administrador'
            action={handleRole}
            variable='purple'
          />
        )}
        <CustomButton
          action={() => setShowIsAdmin(false)}
          text='Cerrar'
          variable='transparent'
        />
      </View>
    </CustomModal>
  );
}
