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
import React, { useRef, useState } from 'react';
import { MyFollowedAnnouncementsStackNavigation } from 'navigation/stacks/MyFollowedAnnouncementsStackNavigation';

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const shouldRefreshHomeTab = useRef(false);
  const shouldRefreshUserProfileTab = useRef(false);
  const shouldRefreshAddAnnouncementTab = useRef(false);
  const shouldRefreshMessagesTab = useRef(false);
  const shouldRefreshFollowedAnnouncementsTab = useRef(false);
  const [
    homeNavigationStackKey,
    setHomeNavigationStackKey,
  ] = useState(0);
  const [
    userProfileNavigationStackKey,
    setUserProfileNavigationStackKey,
  ] = useState(0);
  const [
    addAnnouncementNavigationStackKey,
    setAddAnnouncementNavigationStackKey,
  ] = useState(0);
  const [
    messagesNavigationStackKey,
    setMessagesNavigationStackKey,
  ] = useState(0);
  const [
    followedAnnouncementsNavigationStackKey,
    setFollowedAnnouncementsNavigationStackKey,
  ] = useState(0);

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
        name={stackNavigatorNames.HOME_TAB}
        navigationKey={`homepage-navigation-stack-${homeNavigationStackKey.toString()}`}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[0].state || state.data.state.routes[0].state.index === 0) {
              shouldRefreshHomeTab.current = true;
            } else {
              shouldRefreshHomeTab.current = false;
              shouldRefreshUserProfileTab.current = false;
              shouldRefreshAddAnnouncementTab.current = false;
              shouldRefreshMessagesTab.current = false;
              shouldRefreshFollowedAnnouncementsTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshHomeTab.current) {
              setHomeNavigationStackKey(homeNavigationStackKey + 1);
            }
            shouldRefreshUserProfileTab.current = false;
            shouldRefreshAddAnnouncementTab.current = false;
            shouldRefreshMessagesTab.current = false;
            shouldRefreshFollowedAnnouncementsTab.current = false;
          },
        })}
        component={HomepageNavigationStack}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.HOME_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.USER_PROFILE_TAB}
        component={UserProfileNavigationStack}
        navigationKey={`user-profile-navigation-stack-${userProfileNavigationStackKey.toString()}`}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[1].state || state.data.state.routes[1].state.index === 0) {
              shouldRefreshUserProfileTab.current = true;
            } else {
              shouldRefreshUserProfileTab.current = false;
              shouldRefreshHomeTab.current = false;
              shouldRefreshAddAnnouncementTab.current = false;
              shouldRefreshMessagesTab.current = false;
              shouldRefreshFollowedAnnouncementsTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshUserProfileTab.current) {
              setUserProfileNavigationStackKey(userProfileNavigationStackKey + 1);
            }
            shouldRefreshHomeTab.current = false;
            shouldRefreshAddAnnouncementTab.current = false;
            shouldRefreshMessagesTab.current = false;
            shouldRefreshFollowedAnnouncementsTab.current = false;
          },
        })}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.PERSON_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.ADD_ANNOUNCEMENT_TAB}
        navigationKey={`add-announcement-navigation-stack-${addAnnouncementNavigationStackKey.toString()}`}
        component={AddAnnouncementNavigationStack}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[2].state || state.data.state.routes[2].state.index === 0) {
              shouldRefreshAddAnnouncementTab.current = true;
            } else {
              shouldRefreshUserProfileTab.current = false;
              shouldRefreshHomeTab.current = false;
              shouldRefreshAddAnnouncementTab.current = false;
              shouldRefreshMessagesTab.current = false;
              shouldRefreshFollowedAnnouncementsTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshAddAnnouncementTab.current) {
              setAddAnnouncementNavigationStackKey(addAnnouncementNavigationStackKey + 1);
            }
            shouldRefreshUserProfileTab.current = false;
            shouldRefreshHomeTab.current = false;
            shouldRefreshMessagesTab.current = false;
            shouldRefreshFollowedAnnouncementsTab.current = false;
          },
        })}
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
        navigationKey={`messages-navigation-stack-${messagesNavigationStackKey.toString()}`}
        component={UserProfileNavigationStack}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[3].state || state.data.state.routes[3].state.index === 0) {
              shouldRefreshMessagesTab.current = true;
            } else {
              shouldRefreshUserProfileTab.current = false;
              shouldRefreshHomeTab.current = false;
              shouldRefreshAddAnnouncementTab.current = false;
              shouldRefreshMessagesTab.current = false;
              shouldRefreshFollowedAnnouncementsTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshMessagesTab.current) {
              setMessagesNavigationStackKey(messagesNavigationStackKey + 1);
            }
            shouldRefreshUserProfileTab.current = false;
            shouldRefreshHomeTab.current = false;
            shouldRefreshFollowedAnnouncementsTab.current = false;
            shouldRefreshAddAnnouncementTab.current = false;
          },
        })}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.MAIL_OUTLINE, color),
        }}
      />
      <Tab.Screen
        name={stackNavigatorNames.FOLLOWED_ANNOUNCEMENTS_TAB}
        navigationKey={`followed-announcements-navigation-stack-${followedAnnouncementsNavigationStackKey.toString()}`}
        component={MyFollowedAnnouncementsStackNavigation}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[4].state || state.data.state.routes[4].state.index === 0) {
              shouldRefreshFollowedAnnouncementsTab.current = true;
            } else {
              shouldRefreshUserProfileTab.current = false;
              shouldRefreshHomeTab.current = false;
              shouldRefreshAddAnnouncementTab.current = false;
              shouldRefreshMessagesTab.current = false;
              shouldRefreshFollowedAnnouncementsTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshFollowedAnnouncementsTab.current) {
              setFollowedAnnouncementsNavigationStackKey(followedAnnouncementsNavigationStackKey + 1);
            }
            shouldRefreshUserProfileTab.current = false;
            shouldRefreshHomeTab.current = false;
            shouldRefreshMessagesTab.current = false;
            shouldRefreshAddAnnouncementTab.current = false;
          },
        })}
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
