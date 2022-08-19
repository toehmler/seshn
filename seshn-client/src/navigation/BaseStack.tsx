import { useAuth } from '@/hooks';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, MapScreen, PostScreen } from '@/screens';
import { useColorModeValue, useTheme } from 'native-base';
import { BottomTabs, TabParamList } from './BottomTabs';
import { FeedStackParamList } from './FeedStack';
import { ProfileStackParamList } from './ProfileStack';
import { LibraryStackParamList } from './LibraryStack';
import { Asset, Location } from '@/types';
import { CloseButton, CustomHeader } from '@/components';
import { SessionTrackerStackParamList } from './SessionTrackerStack';

export type BaseStackParamList = {
  Authorized: NavigatorScreenParams<TabParamList>;
  Login: undefined;
  Post: {
    assets: Asset[];
    initialIndex: number;
  };
  Map: {
    path?: Location[];
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends BaseStackParamList,
        FeedStackParamList,
        TabParamList,
        ProfileStackParamList,
        LibraryStackParamList,
        SessionTrackerStackParamList {}
  }
}

const Stack = createStackNavigator<BaseStackParamList>();

export const BaseStack = () => {
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
        <>
          <Stack.Screen
            name="Authorized"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Post"
            component={PostScreen}
            options={{
              presentation: 'transparentModal',
              header: ({ options }) => (
                <CustomHeader
                  options={{
                    ...options,
                    headerLeft: () => <CloseButton color={colors.white} />,
                    headerStyle: {
                      backgroundColor: colors.black,
                      borderBottomWidth: 0,
                      borderBottomColor: colors.black,
                      shadowColor: 'transparent',
                    },
                    headerTitleStyle: {
                      color: colors.white,
                      fontSize: 20,
                      fontWeight: 'bold',
                    },
                  }}
                />
              ),
            }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
        </>
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
