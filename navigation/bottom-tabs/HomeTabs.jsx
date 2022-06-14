import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { UserProfileScreen } from 'screens/user/UserProfile.screen';
import { SettingsScreen } from 'screens/user/Settings.screen';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import sizes from 'themes/sizes';
import icons from 'themes/icons';
import locales from 'constants/locales';
import headerWithoutShadowOptions from 'navigation/styles/headerWithoutShadowOptions';
import { renderLogo } from 'navigation/utils/renderLogo';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import { StyleSheet, View } from 'react-native';
import { HomepageScreen } from '../../screens/Homepage.screen';
import { AddAnnouncementScreen } from '../../screens/announcements/AddAnnouncement.screen';

export const HomeTabs = () => {
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
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.WHITE,
      },
      tabBarActiveTintColor: colors.PRIMARY,
      tabBarInactiveTintColor: colors.SECONDARY,
      tabBarShowLabel: false,
    }}
    >
      <Tab.Screen
        navigationKey="homepage"
        name={stackNavigatorNames.HOMEPAGE}
        component={HomepageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.HOME_OUTLINE, color),
        }}
      />
      <Tab.Screen
        navigationKey="user-profile"
        name={stackNavigatorNames.USER_PROFILE}
        component={UserProfileScreen}
        options={{
          ...headerWithoutShadowOptions,
          headerRight: () => renderLogo(),
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.PERSON_OUTLINE, color),
        }}
      />
      <Tab.Screen
        navigationKey="add-announcement"
        name={stackNavigatorNames.ADD_ANNOUNCEMENT}
        component={AddAnnouncementScreen}
        options={{
          ...headerWithoutShadowOptions,
          headerRight: () => renderLogo(),
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
        navigationKey="messages"
        name="Wiadomości"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.MAIL_OUTLINE, color),
        }}
      />
      <Tab.Screen
        navigationKey="settings"
        name={stackNavigatorNames.SETTINGS}
        component={SettingsScreen}
        options={{
          ...defaultHeaderOptions,
          headerTitle: locales.SETTINGS,
          tabBarIcon: ({
            color,
          }) => drawIcon(icons.SETTINGS_OUTLINE, color),
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
