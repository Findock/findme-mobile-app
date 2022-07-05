import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { AllAnnouncementsDrawer } from 'navigation/drawers/AllAnnouncementsDrawer';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { FCommentsModal } from 'components/Scoped/Comments/FCommentsModal';
import { FMapPreviewModal } from 'components/Composition/FMapPreviewModal';
import React from 'react';
import { LoginHistoryScreen } from 'screens/user/LoginHistory.screen';
import { ChangePasswordScreen } from 'screens/user/ChangePassword.screen';
import { UserProfilePreviewScreen } from 'screens/UserProfilePreview.screen';
import { EditAnnouncementScreen } from 'screens/announcements/EditAnnouncement.screen';
import { MultiSelectScreen } from 'screens/MultiSelect.screen';
import { AnnouncementPreviewScreen } from 'screens/announcements/AnnouncementPreview.screen';
import { MyAnnouncementsScreen } from 'screens/announcements/MyAnnouncements.screen';
import { MyFollowedAnnouncementsScreen } from 'screens/announcements/MyFollowedAnnouncements.screen';
import { UserAnnouncementsScreen } from 'screens/announcements/UserAnnouncements.screen';
import { SettingsScreen } from 'screens/user/Settings.screen';
import { UserProfileScreen } from 'screens/user/UserProfile.screen';

export const UserProfileNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackNavigatorNames.USER_PROFILE}
        component={UserProfileScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.MY_PROFILE,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.ALL_ANNOUNCEMENTS}
        component={AllAnnouncementsDrawer}
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
        name={stackNavigatorNames.PASSWORD_CHANGE}
        component={ChangePasswordScreen}
        options={{
          title: locales.CHANGE_PASSWORD,
          ...defaultHeaderOptions,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.USER_PROFILE_PREVIEW}
        component={UserProfilePreviewScreen}
        options={{
          ...defaultHeaderOptions,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.EDIT_ANNOUNCEMENT}
        component={EditAnnouncementScreen}
        options={{
          ...defaultHeaderOptions,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.MULTI_SELECT}
        component={MultiSelectScreen}
        options={{
          animation: 'slide_from_bottom',
          ...defaultHeaderOptions,
          title: '',
        }}
      />
      <Stack.Group screenOptions={{ ...defaultHeaderOptions }}>
        <Stack.Screen
          name={stackNavigatorNames.ANNOUNCEMENT_PREVIEW}
          component={AnnouncementPreviewScreen}
          options={{
            ...headerWithoutShadowOptions,
          }}
        />
        <Stack.Screen
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
          name={stackNavigatorNames.COMMENTS_MODAL}
          component={FCommentsModal}
        />
        <Stack.Screen
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
          name={stackNavigatorNames.MAP_PREVIEW_MODAL}
          component={FMapPreviewModal}
        />
      </Stack.Group>
      <Stack.Screen
        navigationKey="settings"
        name={stackNavigatorNames.SETTINGS}
        component={SettingsScreen}
        options={{
          ...defaultHeaderOptions,
          headerTitle: locales.SETTINGS,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.MY_ANNOUNCEMENTS}
        component={MyAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.MY_ANNOUNCEMENTS,
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
        }}
      />
    </Stack.Navigator>
  );
};
