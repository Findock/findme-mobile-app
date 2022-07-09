import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { FCommentsModal } from 'components/Scoped/Comments/FCommentsModal';
import { FMapPreviewModal } from 'components/Composition/FMapPreviewModal';
import React from 'react';
import { UserProfilePreviewScreen } from 'screens/UserProfilePreview.screen';
import { AnnouncementPreviewScreen } from 'screens/announcements/AnnouncementPreview.screen';
import { UserAnnouncementsScreen } from 'screens/announcements/UserAnnouncements.screen';
import locales from 'constants/locales';
import { MessagesScreen } from 'screens/chat/Messages.screen';
import { MessagesPreviewScreen } from 'screens/chat/MessagesPreview.screen';

export const MessagesNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackNavigatorNames.MESSAGES}
        component={MessagesScreen}
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
