import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React, { useEffect } from 'react';
import { HomepageScreen } from 'screens/Homepage.screen';
import { LoginScreen } from 'screens/Login.screen';
import { RegistrationScreen } from 'screens/Registration.screen';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from 'store/auth/authSlice';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    setAuthToken();
  }, []);

  const setAuthToken = async () => {
    const authToken = await SecureStore.getItemAsync('Authorization');
    dispatch(setToken(authToken));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
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
