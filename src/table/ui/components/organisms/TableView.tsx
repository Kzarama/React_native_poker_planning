import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import { useTableStore } from '@/table/core/store/useTableStore';
import CardsView from '@/table/ui/components/molecules/CardsView';
import { addPlayer, vote } from '@/table/use-cases/tableFunctions';
import { IUser } from '@/user/core/utils/interfaces';
import { UserView } from '@/user/ui/components/molecules/UserView';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

interface IProps {
  userInfo: IUser;
}

export default function TableView({ userInfo }: IProps) {
  const [showScores, setShowScores] = useState(false);

  const users = useTableStore((state) => state.users);
  const setUsers = useTableStore((state) => state.setUsers);

  const userCardVerification = () => {
    if (userInfo.userType === 'player') {
      if (userInfo.vote !== undefined && !showScores) return 'active';
    } else {
      return 'user';
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      setUsers(addPlayer());
    }
  }, []);

  useEffect(() => {
    if (userInfo.vote && users.length > 0 && !showScores) {
      setUsers(vote(users));
    }
  }, [userInfo.vote]);

  return (
    <View className='flex-1'>
      <View className='flex-1 items-center top-24'>
        <View className='w-[200] h-[360] p-2 border-2 rounded-full border-[#6429CD]'>
          <View className='w-[180] h-[340] p-2 border-2 rounded-full border-[#BDBDFF99]'>
            <View className='w-[160] h-[320] border-2 rounded-full border-[#3e1684] items-center justify-center'>
              {userInfo.isAdmin && (
                <CustomButton
                  className='w-[80] h-[50]'
                  text='Revelar cartas'
                  action={() => setShowScores(true)}
                />
              )}
            </View>
          </View>
        </View>

        <UserView
          userName={userInfo?.name}
          score={String(userInfo.vote)}
          showScore={showScores}
          position={`bottom-[${showScores ? '140' : '240'}]`}
          type={userCardVerification()}
        />

        {users.map((player) => {
          return (
            player?.visible && (
              <UserView
                key={player.id}
                userName={player.name}
                score={player.vote}
                showScore={showScores}
                position={player.position}
                type={
                  player.vote !== undefined && !showScores
                    ? 'active'
                    : undefined
                }
              />
            )
          );
        })}
      </View>

      {userInfo?.userType === 'player' && (
        <CardsView vote={userInfo.vote} showScores={showScores} />
      )}
    </View>
  );
}
