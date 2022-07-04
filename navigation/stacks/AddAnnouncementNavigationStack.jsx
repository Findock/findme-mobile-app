import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { FCommentsModal } from 'components/Scoped/Comments/FCommentsModal';
import { FMapPreviewModal } from 'components/Composition/FMapPreviewModal';
import React from 'react';
import { EditAnnouncementScreen } from 'screens/announcements/EditAnnouncement.screen';
import { MultiSelectScreen } from 'screens/MultiSelect.screen';
import { SelectScreen } from 'screens/Select.screen';
import { AnnouncementPreviewScreen } from 'screens/announcements/AnnouncementPreview.screen';
import { AddAnnouncementScreen } from 'screens/announcements/AddAnnouncement.screen';

export const AddAnnouncementNavigationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackNavigatorNames.ADD_ANNOUNCEMENT}
        component={AddAnnouncementScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.NEW_ANNOUNCEMENT,
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
    </Stack.Navigator>
  );
};
