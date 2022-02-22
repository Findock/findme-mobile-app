import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React from 'react';
import { HomepageScreen } from 'screens/Homepage.screen';
import { LoginScreen } from 'screens/Login.screen';
import { RegistrationScreen } from 'screens/Registration.screen';
import * as SecureStore from 'expo-secure-store';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();

  const getAuthToken = async () => {
    const token = await SecureStore.getItemAsync('Authorization');
    return token;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!getAuthToken() ? (
          <>
            <Stack.Screen
              name={stackNavigatorNames.REGISTRATION}
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.LOGIN}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )
          : (
            <Stack.Screen
              name={stackNavigatorNames.HOMEPAGE}
              component={HomepageScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
