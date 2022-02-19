import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React from 'react';
import { RegistrationScreen } from 'screens/Registration.screen';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={stackNavigatorNames.REGISTRATION}
          component={RegistrationScreen}
          options={{
            headerShown: false,
            title: stackNavigatorNames.REGISTRATION,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
