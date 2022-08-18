import { TabBarIcon } from '@/components';
import { useAppDispatch } from '@/hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigatorScreenParams,
  useFocusEffect,
} from '@react-navigation/native';
import { pauseVideo } from '@/redux';
import { useColorModeValue, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { FeedStack, FeedStackParamList } from './FeedStack';
import { ProfileStack } from './ProfileStack';
import { LibraryStack } from './LibraryStack';
import { SessionTrackerStack } from './SessionTrackerStack';

export type TabParamList = {
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Profile: undefined;
  Library: undefined;
  SessionTracker: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTabs = () => {
  const { colors } = useTheme();

  const [backgroundColor, tabBarInactiveTintColor] = useColorModeValue(
    [colors.bgLight, colors.dark[400]],
    [colors.bgDark, colors.dark[700]]
  );

  const dispatch = useAppDispatch();

  // pause any video on tab navigation change
  useFocusEffect(() => {
    dispatch(pauseVideo());
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor,
        tabBarIcon: ({ focused, size, color }) => (
          <TabBarIcon
            routeName={route.name}
            focused={focused}
            size={size}
            color={color}
          />
        ),
        tabBarButton: (props) => (
          <TouchableOpacity activeOpacity={0.5} {...props}>
            {props.children}
          </TouchableOpacity>
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Library" component={LibraryStack} />
      <Tab.Screen name="SessionTracker" component={SessionTrackerStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
