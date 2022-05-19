import { createDrawerNavigator } from '@react-navigation/drawer';
import { FAnnouncementFiltersDrawer } from 'components/Scoped/AnnouncementFiltersDrawer/FAnnouncementFiltersDrawer';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import { renderLogo } from 'navigation/utils/renderLogo';
import React from 'react';
import { AllAnnouncementsScreen } from 'screens/announcements/AllAnnouncements.screen';
import sizes from 'themes/sizes';

export const AllAnnouncementsDrawer = () => {
  const Drawer = createDrawerNavigator();

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
        headerRightContainerStyle: {
          paddingRight: sizes.PADDING_15,
        },
      }}
    >
      <Drawer.Screen
        name={stackNavigatorNames.ALL_ANNOUNCEMENTS_DRAWER}
        component={AllAnnouncementsScreen}
        options={{
          ...defaultHeaderOptions,
          title: '',
          headerLeft: () => null,
          headerRight: () => renderLogo(),
        }}
      />
    </Drawer.Navigator>
  );
};
