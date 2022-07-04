import { createNativeStackNavigator } from '@react-navigation/native-stack';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';
import React from 'react';
import { MyFollowedAnnouncementsScreen } from 'screens/announcements/MyFollowedAnnouncements.screen';

export const MyFollowedAnnouncementsStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={stackNavigatorNames.MY_FOLLOWED_ANNOUNCEMENTS}
        component={MyFollowedAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.FOLLOWED_ANNOUNCEMENTS,
        }}
      />
    </Stack.Navigator>
  );
};
