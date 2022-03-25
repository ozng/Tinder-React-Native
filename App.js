import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()
import StackNavigator from './StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;