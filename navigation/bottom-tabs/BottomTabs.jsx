import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import icons from 'themes/icons';
import { StyleSheet, View } from 'react-native';
import { HomepageNavigationStack } from 'navigation/stacks/HomepageNavigationStack';
import { UserProfileNavigationStack } from 'navigation/stacks/UserProfileNavigationStack';
import { AddAnnouncementNavigationStack } from 'navigation/stacks/AddAnnouncementNavigationStack';
import React from 'react';
import { MyFollowedAnnouncementsStackNavigation } from 'navigation/stacks/MyFollowedAnnouncementsStackNavigation';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  const drawIcon = (
    icon,
    color,
  ) => (
    <Ionicons
      name={icon}
      size={sizes.ICON_30}
      color={color}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.WHITE,
        },
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: colors.SECONDARY,
        tabBarShowLabel: false,
        headerShown: false,
      }}
      backBehavior="none"
    >
      <Tab.Screen
        name={stackNavigatorNames.HOMEPAGE}
        component={HomepageNavigationStack}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.HOME_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.USER_PROFILE}
        component={UserProfileNavigationStack}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.PERSON_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.ADD_ANNOUNCEMENT}
        component={AddAnnouncementNavigationStack}
        options={{
          tabBarIcon: ({
            color,
          }) => (
            <View style={styles.middleButton}>
              <View style={{
                left: sizes.POSITION_1_3,
              }}
              >
                <Ionicons
                  name={icons.ADD_CIRCLE_OUTLINE}
                  size={sizes.ICON_60}
                  color={color}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={UserProfileNavigationStack}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.MAIL_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.MY_FOLLOWED_ANNOUNCEMENTS}
        component={MyFollowedAnnouncementsStackNavigation}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.HEART_OUTLINE, color),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  middleButton: {
    position: 'absolute',
    bottom: sizes.POSITION_5,
    width: sizes.WIDTH_60,
    height: sizes.HEIGHT_60,
    borderRadius: sizes.RADIUS_30,
    backgroundColor: colors.WHITE,
  },
});
