// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen 
            name="Registration"
            component={RegistrationScreen}
            options={{
            title: 'Registro de Usuario',
            headerShown: false,
            }}

        />
        <Stack.Screen 
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: 'Bienvenido',
            headerShown: false,
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}