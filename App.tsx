import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import InfoScreen from './src/screens/InfoScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';

import { showWelcomeNotification } from './src/utils/notification';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  useEffect(() => {
    showWelcomeNotification();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{ title: 'Info' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;