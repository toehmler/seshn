import { createStackNavigator } from '@react-navigation/stack';
import { ReviewMapScreen, SessionTrackerScreen } from '@/screens';
import { Region } from 'react-native-maps';

export type SessionTrackerStackParamList = {
  SessionTrackerHome: undefined;
  ReviewMap: {
    region: Region;
  };
};

const Stack = createStackNavigator<SessionTrackerStackParamList>();

export const SessionTrackerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SessionTrackerHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SessionTrackerHome"
        component={SessionTrackerScreen}
        options={{
          title: 'Session Tracker',
        }}
      />
      <Stack.Screen
        name="ReviewMap"
        component={ReviewMapScreen}
        options={{
          title: 'Review Map',
        }}
      />
    </Stack.Navigator>
  );
};
