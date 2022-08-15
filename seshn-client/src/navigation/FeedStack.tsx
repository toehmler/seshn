import { CustomHeader, GoBackButton } from '@/components';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen, SearchScreen } from '@/screens';

export type FeedStackParamList = {
  FeedHome: undefined;
  Search: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

export const FeedStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FeedHome"
      screenOptions={{
        header: ({ options }) => <CustomHeader options={options} />,
      }}
    >
      <Stack.Screen
        name="FeedHome"
        component={FeedScreen}
        options={{
          headerTitle: 'Your Feed',
          // headerRight is set in FeedScreen
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerLeft: () => <GoBackButton />,
          // headerTitle is set in SearchScreen
        }}
      />
    </Stack.Navigator>
  );
};
