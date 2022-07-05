import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, setToken } from 'store/auth/authSlice';
import { setGlobalLoader } from 'store/global-loader/globalLoaderSlice';
import appConfig from 'app.config';
import { setMe } from 'store/me/meSlice';
import { authValidateTokenService } from 'services/auth/authValidateToken.service';
import { getMeService } from 'services/user/getMe.service';
import { setAnimalCategories, setAreOptionsLoading, setCoatColors } from 'store/filters-options/filtersOptionsSlice';
import { getCategoriesService } from 'services/announcement/getCategories.service';
import { getCoatColorsService } from 'services/announcement/getCoatColors.service';
import { BottomTabs } from 'navigation/bottom-tabs/BottomTabs';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { FGlobalLoader } from 'components/Composition/FGlobalLoader';
import { AuthNavigationStack } from 'navigation/stacks/AuthNavigationStack';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.globalLoader.isLoading);
  const token = useSelector((state) => state.auth.token);
  const areFiltersOptionsLoading = useSelector((state) => state.filtersOptions.areOptionsLoading);

  useEffect(() => {
    setAuthToken();
  }, []);

  useEffect(() => {
    fetchAnimalCategories();
    fetchCoatColors();
  }, []);

  useEffect(() => isAuth && fetchMe(), [isAuth]);

  useEffect(() => {
    checkIfAuthTokenIsValid();
  }, [token]);

  const fetchAnimalCategories = async () => {
    try {
      dispatch(setAreOptionsLoading(true));
      const res = await getCategoriesService();
      dispatch(setAnimalCategories(res.data));
      dispatch(setAreOptionsLoading(false));
    } catch (error) {
      dispatch(setAreOptionsLoading(false));
    }
  };

  const fetchCoatColors = async () => {
    try {
      dispatch(setAreOptionsLoading(true));
      const res = await getCoatColorsService();
      dispatch(setCoatColors(res.data));
      dispatch(setAreOptionsLoading(false));
    } catch (error) {
      dispatch(setAreOptionsLoading(false));
    }
  };

  const setAuthToken = async () => {
    const authToken = await SecureStore.getItemAsync('Authorization');
    dispatch(setToken(authToken));
    setTimeout(() => {
      dispatch(setGlobalLoader(false));
    }, appConfig.extra.globalLoaderDismissTimeout);
  };

  const fetchMe = async () => {
    const res = await getMeService();
    dispatch(setMe(res.data));
  };

  const checkIfAuthTokenIsValid = async () => {
    try {
      await authValidateTokenService();
    } catch (error) {
      dispatch(removeToken());
    }
  };
  console.log('a');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isLoading ? (
            <Stack.Screen
              name={stackNavigatorNames.GLOBAL_LOADER}
              component={FGlobalLoader}
              options={{
                headerShown: false,
              }}
            />
          )
            : (!isAuth ? (
              <Stack.Screen
                name={stackNavigatorNames.AUTH_ROOT}
                component={AuthNavigationStack}
                options={{
                  headerShown: false,
                }}
              />
            )
              : (
                areFiltersOptionsLoading ? (
                  <Stack.Screen
                    name={stackNavigatorNames.GLOBAL_LOADER}
                    component={FGlobalLoader}
                    options={{
                      headerShown: false,
                    }}
                  />
                )
                  : (
                    <Stack.Screen
                      name={stackNavigatorNames.APP_ROOT}
                      component={BottomTabs}
                      options={{
                        headerShown: false,
                      }}
                    />
                  )
              )
            )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
