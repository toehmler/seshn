import { createStackNavigator } from '@react-navigation/stack';
import { ReviewMapScreen, SessionTrackerScreen } from '@/screens';

export type SessionTrackerStackParamList = {
  SessionTrackerHome: undefined;
  ReviewMap: undefined;
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
