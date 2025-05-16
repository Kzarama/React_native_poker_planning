import ScreenLayout from '@/shared/ui/components/templates/ScreenLayout';
import { useTableStore } from '@/table/core/store/useTableStore';
import HeaderTable from '@/table/ui/components/organisms/HeaderTable';
import TableView from '@/table/ui/components/organisms/TableView';
import { useUserStore } from '@/user/core/store/useUserStore';
import ModalUser from '@/user/ui/components/molecules/ModalUser';

export default function Table() {
  const userInfo = useUserStore((state) => state.userInfo);
  const tableName = useTableStore((state) => state.tableName);

  return (
    <ScreenLayout>
      <HeaderTable tableName={tableName} userName={userInfo?.name} />

      {<TableView userInfo={userInfo} />}

      {!userInfo.id && <ModalUser />}
    </ScreenLayout>
  );
}
