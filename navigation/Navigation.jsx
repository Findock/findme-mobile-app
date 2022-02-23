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
import { FGlobalLoader } from 'components/Composition/FGlobalLoader';
import { setGlobalLoader } from 'store/global-loader/globalLoaderSlice';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.globalLoader.isLoading);

  useEffect(() => {
    setAuthToken();
  }, []);

  const setAuthToken = async () => {
    const authToken = await SecureStore.getItemAsync('Authorization');
    dispatch(setToken(authToken));
    setTimeout(() => {
      dispatch(setGlobalLoader(false));
    }, 1000);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name={stackNavigatorNames.LOGIN}
            component={FGlobalLoader}
            options={{
              headerShown: false,
            }}
          />
        ) : (!isAuth ? (
          <>
            <Stack.Screen
              name={stackNavigatorNames.LOGIN}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.REGISTRATION}
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name={stackNavigatorNames.HOMEPAGE}
            component={HomepageScreen}
            options={{
              headerShown: false,
            }}
          />
        ))}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
