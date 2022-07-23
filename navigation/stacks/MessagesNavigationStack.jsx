import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import React from 'react';
import { MessagesPreviewScreen } from 'screens/chat/MessagesPreview.screen';
import { FChatSelectedPhotoModal } from 'components/Scoped/Chat/FChatSelectedPhotoModal';
import { TopMessagesTabs } from 'navigation/top-tabs/TopMessagesTabs';
import { FMapPreviewModal } from 'components/Composition/FMapPreviewModal';
import { FCommentsModal } from 'components/Scoped/Comments/FCommentsModal';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { UserAnnouncementsScreen } from 'screens/announcements/UserAnnouncements.screen';
import { AnnouncementPreviewScreen } from 'screens/announcements/AnnouncementPreview.screen';
import { UserProfilePreviewScreen } from 'screens/UserProfilePreview.screen';
import locales from 'constants/locales';

export const MessagesNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={stackNavigatorNames.TOP_MESSAGES_TAB}
          component={TopMessagesTabs}
          options={{
            ...defaultHeaderOptions,
            title: locales.MESSAGES,
          }}
        />
        <Stack.Screen
          name={stackNavigatorNames.MESSAGES_PREVIEW}
          component={MessagesPreviewScreen}
          options={{
            ...defaultHeaderOptions,
            title: '',
          }}
        />
        <Stack.Screen
          options={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',

          }}
          name={stackNavigatorNames.CHAT_SELECTED_PHOTO_MODAL}
          component={FChatSelectedPhotoModal}
        />
      </Stack.Group>
      <Stack.Screen
        name={stackNavigatorNames.USER_PROFILE_PREVIEW}
        component={UserProfilePreviewScreen}
        options={{
          ...defaultHeaderOptions,
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
        name={stackNavigatorNames.USER_ANNOUNCEMENTS}
        component={UserAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
        }}
      />
    </Stack.Navigator>
  );
};
