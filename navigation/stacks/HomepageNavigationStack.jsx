import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { AllAnnouncementsDrawer } from 'navigation/drawers/AllAnnouncementsDrawer';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { FCommentsModal } from 'components/Scoped/Comments/FCommentsModal';
import { FMapPreviewModal } from 'components/Composition/FMapPreviewModal';
import React from 'react';
import { UserProfilePreviewScreen } from 'screens/UserProfilePreview.screen';
import { EditAnnouncementScreen } from 'screens/announcements/EditAnnouncement.screen';
import { MultiSelectScreen } from 'screens/MultiSelect.screen';
import { SelectScreen } from 'screens/Select.screen';
import { AnnouncementPreviewScreen } from 'screens/announcements/AnnouncementPreview.screen';
import { MyAnnouncementsScreen } from 'screens/announcements/MyAnnouncements.screen';
import { MyFollowedAnnouncementsScreen } from 'screens/announcements/MyFollowedAnnouncements.screen';
import { UserAnnouncementsScreen } from 'screens/announcements/UserAnnouncements.screen';
import { LastViewedAnnouncementsScreen } from 'screens/announcements/LastViewedAnnouncements.screen';
import { NearbyAnnouncementsScreen } from 'screens/announcements/NearbyAnnouncements.screen';
import { RecentlyCreatedAnnouncementsScreen } from 'screens/announcements/RecentlyCreatedAnnouncements.screen';
import { HomepageScreen } from 'screens/Homepage.screen';
import { AddAnnouncementScreen } from 'screens/announcements/AddAnnouncement.screen';
import { UserProfileScreen } from 'screens/user/UserProfile.screen';

export const HomepageNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackNavigatorNames.HOMEPAGE}
        component={HomepageScreen}
        options={{
          headerShown: false,
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
        name={stackNavigatorNames.ADD_ANNOUNCEMENT}
        component={AddAnnouncementScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.NEW_ANNOUNCEMENT,
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
        name={stackNavigatorNames.USER_PROFILE}
        component={UserProfileScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.MY_PROFILE,
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
      <Stack.Screen
        name={stackNavigatorNames.SELECT}
        component={SelectScreen}
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
      <Stack.Screen
        name={stackNavigatorNames.LAST_VIEWED_ANNOUNCEMENTS}
        component={LastViewedAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.LAST_VIEWED,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.NEARBY_ANNOUNCEMENTS}
        component={NearbyAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.NEARBY_ANNOUNCEMENTS,
        }}
      />
      <Stack.Screen
        name={stackNavigatorNames.RECENTLY_CREATED_ANNOUNCEMENTS}
        component={RecentlyCreatedAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.RECENTLY_CREATED,
        }}
      />
    </Stack.Navigator>
  );
};
