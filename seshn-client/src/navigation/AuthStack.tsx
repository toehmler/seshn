import { useAuth } from '@/hooks';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens';
import { useColorModeValue, useTheme } from 'native-base';
import { BottomTabs, TabParamList } from './BottomTabs';
import { FeedStackParamList } from './FeedStack';
import { ProfileStackParamList } from './ProfileStack';
import { LibraryStackParamList } from './LibraryStack';

export type AuthStackParamList = {
  Authorized: NavigatorScreenParams<TabParamList>;
  Login: undefined;
  SignUp: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AuthStackParamList,
        FeedStackParamList,
        TabParamList,
        ProfileStackParamList,
        LibraryStackParamList {}
  }
}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const { colors } = useTheme();
  const { accessToken } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: useColorModeValue(colors.bgLight, colors.bgDark),
        },
        headerTitleStyle: {
          color: useColorModeValue(colors.black, colors.white),
          fontSize: 20,
          fontWeight: 'bold',
        },
      }}
    >
      {accessToken ? (
        <Stack.Screen
          name="Authorized"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
