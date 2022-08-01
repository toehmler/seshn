import { createStackNavigator } from '@react-navigation/stack';
import { LibraryScreen } from '@/screens';
import { CustomHeader } from '@/components';

export type LibraryStackParamList = {
  LibraryHome: undefined;
  VideoEditor: undefined;
  PostEditor: undefined;
};

const Stack = createStackNavigator<LibraryStackParamList>();

export const LibraryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LibraryHome"
      screenOptions={{
        header: ({ options }) => <CustomHeader options={options} />,
      }}
    >
      <Stack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{
          title: 'Library',
        }}
      />
    </Stack.Navigator>
  );
};
