import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React, { useEffect } from 'react';
import { LoginScreen } from 'screens/Login.screen';
import { RegistrationScreen } from 'screens/Registration.screen';
import * as SecureStore from 'expo-secure-store';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken, setToken } from 'store/auth/authSlice';
import { FGlobalLoader } from 'components/Composition/FGlobalLoader';
import { setGlobalLoader } from 'store/global-loader/globalLoaderSlice';
import appConfig from 'app.config';
import { LoginHistoryScreen } from 'screens/LoginHistory.screen';
import locales from 'constants/locales';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { setMe } from 'store/me/meSlice';
import { UserProfileScreen } from 'screens/UserProfile.screen';
import { SettingsScreen } from 'screens/Settings.screen';
import { ChangePasswordScreen } from 'screens/ChangePassword.screen';
import { ForgotPasswordScreen } from 'screens/ForgotPassword.screen';
import { UserProfilePreviewScreen } from 'screens/UserProfilePreview.screen';
import { FLogo } from 'components/Composition/FLogo';
import { AddAnnouncementScreen } from 'screens/AddAnnouncement.screen';
import { authValidateTokenService } from 'services/auth/authValidateToken.service';
import { getMeService } from 'services/user/getMe.service';
import { MultiSelectScreen } from 'screens/MultiSelect.screen';
import { AnnouncementPreviewScreen } from 'screens/AnnouncementPreview.screen';
import { EditAnnouncementScreen } from 'screens/EditAnnouncement.screen';
import { SelectScreen } from 'screens/Select.screen';
import { MyAnnouncementsScreen } from 'screens/MyAnnouncements.screen';
import { MyFollowedAnnouncementsScreen } from 'screens/MyFollowedAnnouncements.screen';
import { UserAnnouncementsScreen } from 'screens/UserAnnouncements.screen';
import { HomeDrawer } from 'navigation/drawers/HomeDrawer';

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.globalLoader.isLoading);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setAuthToken();
  }, []);

  useEffect(() => isAuth && fetchMe(), [isAuth]);

  useEffect(() => {
    checkIfAuthTokenIsValid();
  }, [token]);

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

  const renderLogo = () => (
    <FLogo
      color={colors.PRIMARY}
      fill={false}
    />
  );

  const checkIfAuthTokenIsValid = async () => {
    try {
      await authValidateTokenService();
    } catch (error) {
      dispatch(removeToken());
    }
  };

  const defaultHeaderOptions = {
    headerBackTitle: locales.GO_BACK,
    headerTintColor: colors.BLACK,
    headerTitleStyle: {
      fontSize: fonts.HEADING_LARGE,
    },

  };

  const headerWithoutShadowOptions = {
    headerBackTitle: locales.GO_BACK,
    headerTintColor: colors.BLACK,
    headerShadowVisible: false,
    headerTitle: '',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name={stackNavigatorNames.GLOBAL_LOADER}
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
            <Stack.Screen
              name={stackNavigatorNames.FORGOT_PASSWORD}
              component={ForgotPasswordScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.PASSWORD_RECOVERY,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="A"
              component={HomeDrawer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.LOGIN_HISTORY}
              component={LoginHistoryScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.LOGIN_HISTORY,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.USER_PROFILE}
              component={UserProfileScreen}
              options={{
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.SETTINGS}
              component={SettingsScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.SETTINGS,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.PASSWORD_CHANGE}
              component={ChangePasswordScreen}
              options={{
                title: locales.CHANGE_PASSWORD,
                headerBackTitle: locales.GO_BACK,
                headerTintColor: colors.BLACK,
                headerTitleStyle: {
                  fontSize: fonts.HEADING_LARGE,
                },
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.USER_PROFILE_PREVIEW}
              component={UserProfilePreviewScreen}
              options={{
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.ADD_ANNOUNCEMENT}
              component={AddAnnouncementScreen}
              options={{
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.EDIT_ANNOUNCEMENT}
              component={EditAnnouncementScreen}
              options={{
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.MULTI_SELECT}
              component={MultiSelectScreen}
              options={{
                animation: 'slide_from_bottom',
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.SELECT}
              component={SelectScreen}
              options={{
                animation: 'slide_from_bottom',
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.ANNOUNCEMENT_PREVIEW}
              component={AnnouncementPreviewScreen}
              options={{
                ...headerWithoutShadowOptions,
                headerRight: () => renderLogo(),
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.MY_ANNOUNCEMENTS}
              component={MyAnnouncementsScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.MY_ANNOUNCEMENTS,
                headerStyle: {
                  shadowOpacity: 20,
                  borderBottomColor: 'red',
                },
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.MY_FOLLOWED_ANNOUNCEMENTS}
              component={MyFollowedAnnouncementsScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.FOLLOWED_ANNOUNCEMENTS,
              }}
            />
            <Stack.Screen
              name={stackNavigatorNames.USER_ANNOUNCEMENTS}
              component={UserAnnouncementsScreen}
              options={{
                ...defaultHeaderOptions,
                title: locales.USER_ANNOUNCEMENTS,
              }}
            />
          </>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
