import { AuthStack } from '@/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@/redux';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from '@/constants';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="default" />
            <AuthStack />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
