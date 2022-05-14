import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAnnouncementFiltersDrawer } from 'components/Scoped/AnnouncementFiltersDrawer/FAnnouncementFiltersDrawer';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React from 'react';
import { AllAnnouncementsScreen } from 'screens/announcements/AllAnnouncements.screen';
import sizes from 'themes/sizes';

export const AllAnnouncementsDrawer = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <Drawer.Navigator
      drawerContent={() => <FAnnouncementFiltersDrawer />}
      initialRouteName={stackNavigatorNames.ALL_ANNOUNCEMENTS}
      screenOptions={{
        drawerStyle: {
          width: sizes.WIDTH_90_PERCENTAGES,
          right: 0,
        },
        drawerStatusBarAnimation: 'fade',
        drawerType: 'front',
        drawerPosition: 'right',
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name={stackNavigatorNames.ALL_ANNOUNCEMENTS_DRAWER}
        component={AllAnnouncementsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
