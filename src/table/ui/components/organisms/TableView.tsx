import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import { useTableStore } from '@/table/core/store/useTableStore';
import CardsView from '@/table/ui/components/molecules/CardsView';
import VotesView from '@/table/ui/components/molecules/VotesView';
import {
  addPlayer,
  resetPlayers,
  vote,
} from '@/table/use-cases/tableFunctions';
import { useUserStore } from '@/user/core/store/useUserStore';
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
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const userCardVerification = ({ userType, vote }: IUser) => {
    if (userType === 'player') {
      if (vote !== undefined && !showScores) return 'active';
    } else {
      return 'user';
    }
  };

  const handleTableButton = () => {
    if (showScores) {
      setUsers(resetPlayers(users));
      setUserInfo({ ...userInfo, vote: undefined });
      setShowScores(false);
      return;
    }
    if (userInfo.userType === 'viewer') setUsers(vote(users));
    setShowScores(true);
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
                  text={showScores ? 'Reiniciar partida' : 'Revelar cartas'}
                  action={handleTableButton}
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
          type={userCardVerification(userInfo)}
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
                type={userCardVerification(player)}
              />
            )
          );
        })}
      </View>

      {showScores ? (
        userInfo?.userType === 'player' && <VotesView />
      ) : (
        <CardsView vote={userInfo.vote} />
      )}
    </View>
  );
}
