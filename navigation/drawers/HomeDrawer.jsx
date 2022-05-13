import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAnnouncementFiltersDrawer } from 'components/Scoped/AnnouncementFiltersDrawer/FAnnouncementFiltersDrawer';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import React from 'react';
import { HomepageScreen } from 'screens/Homepage.screen';
import sizes from 'themes/sizes';

export const HomeDrawer = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <Drawer.Navigator
      drawerContent={() => <FAnnouncementFiltersDrawer />}
      initialRouteName={stackNavigatorNames.HOMEPAGE}
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
      <Stack.Screen
        name={stackNavigatorNames.HOMEPAGE}
        component={HomepageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
