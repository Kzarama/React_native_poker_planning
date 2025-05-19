import CustomButton from '@/shared/ui/components/atoms/CustomButton';
import { useOrientation } from '@/table/core/hooks/useOrientation';
import { useTableStore } from '@/table/core/store/useTableStore';
import CardsView from '@/table/ui/components/molecules/CardsView';
import VotesView from '@/table/ui/components/molecules/VotesView';
import {
  addPlayer,
  resetPlayers,
  vote,
} from '@/table/use-cases/tableFunctions';
import { useUserStore } from '@/user/core/store/useUserStore';
import { IUser } from '@/user/domain/userModel';
import { UserView } from '@/user/ui/components/molecules/UserView';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface IProps {
  userInfo: IUser;
}

export default function TableView({ userInfo }: IProps) {
  const [showScores, setShowScores] = useState(false);
  const orientation = useOrientation();

  const users = useTableStore((state) => state.users);
  const tableName = useTableStore((state) => state.tableName);
  const setUsers = useTableStore((state) => state.setUsers);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

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

  const renderContent = () => {
    if (showScores) return <VotesView />;
    if (userInfo?.userType === 'player') {
      return userInfo.id !== undefined ? (
        <CardsView vote={userInfo.vote} />
      ) : null;
    }
    return <View className='w-[295]' />;
  };

  useEffect(() => {
    if (users.length === 0) {
      setUsers(addPlayer());
    }
  }, []);

  useEffect(() => {
    if (userInfo.vote !== undefined && users.length > 0 && !showScores) {
      setUsers(vote(users));
    }
  }, [userInfo.vote]);

  return (
    <View
      className={`flex-1 ${orientation === 'portrait' ? 'flex-col' : 'flex-row'}`}
    >
      <View className='flex-1 items-center top-24'>
        <View
          className={`p-2 border-2 rounded-full border-[#6429CD] ${orientation === 'portrait' ? 'w-[200] h-[360] ' : 'w-[360] h-[180]'}`}
        >
          <View
            className={`p-2 border-2 rounded-full border-[#BDBDFF99] ${orientation === 'portrait' ? 'w-[180] h-[340] ' : 'w-[340] h-[160]'}`}
          >
            <View
              className={`border-2 rounded-full border-[#3e1684] items-center justify-center ${orientation === 'portrait' ? 'w-[160] h-[320] ' : 'w-[320] h-[140] gap-3'}`}
            >
              {orientation !== 'portrait' && (
                <Text className='text-3xl font-extrabold text-white'>
                  {tableName}
                </Text>
              )}
              {userInfo.isAdmin && (
                <CustomButton
                  className={`${orientation === 'portrait' ? 'w-[90] h-[50]' : 'w-[140] h-[33]'}`}
                  text={showScores ? 'Nueva votación' : 'Revelar cartas'}
                  action={handleTableButton}
                  variable='purple'
                  disabled={
                    userInfo.userType === 'player' &&
                    userInfo.vote === undefined
                  }
                />
              )}
            </View>
          </View>
        </View>

        {users.concat(userInfo).map((player) => {
          return (
            player?.visible &&
            player.id && (
              <UserView
                key={player.id}
                user={player}
                showScores={showScores}
                position={
                  orientation === 'portrait'
                    ? player.position.portrait
                    : player.position.landscape
                }
              />
            )
          );
        })}
      </View>

      {renderContent()}
    </View>
  );
}
