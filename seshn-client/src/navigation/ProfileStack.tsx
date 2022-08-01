import {
  CustomHeader,
  GoBackButton,
  ProfileSettingsButton,
} from '@/components';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, SettingsScreen } from '@/screens';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        header: ({ options }) => <CustomHeader options={options} />,
      }}
    >
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{
          headerTitle: 'John Doe',
          headerRight: () => <ProfileSettingsButton />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
          headerLeft: () => <GoBackButton />,
        }}
      />
    </Stack.Navigator>
  );
};
