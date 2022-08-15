import { MainLayout } from '@/components';
import { logout } from '@/helpers';
import { useActionSheet, useAppDispatch } from '@/hooks';
import { setAccessToken } from '@/redux';
import { Button } from 'native-base';

export const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // dispatch(setAccessToken());
    logout(() => dispatch(setAccessToken()));
  };

  const showActionSheet = useActionSheet(
    [
      {
        text: 'Log Out',
        destructive: true,
        action: handleLogout,
      },
    ],
    {
      title: 'Are you sure you want to log out?',
    }
  );

  return (
    <MainLayout centered={false} pt={5} contentWidth="90%">
      <Button colorScheme="danger" onPress={showActionSheet}>
        Log Out
      </Button>
    </MainLayout>
  );
};
