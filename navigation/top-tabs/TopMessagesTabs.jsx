import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { MessagesScreen } from 'screens/chat/Messages.screen';
import defaultHeaderOptions from 'navigation/styles/defaultHeaderOptions';
import locales from 'constants/locales';
import React, { useRef, useState } from 'react';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { ArchivedMessagesScreen } from 'screens/chat/ArchivedMessages.screen';

export const TopMessagesTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  const shouldRefreshActiveMessagesTab = useRef(false);
  const shouldRefreshArchivedMessagesTab = useRef(false);
  const [
    activeMessagesNavigationScreenKey,
    setActiveMessagesNavigationScreenKey,
  ] = useState(0);
  const [
    archivedMessagesNavigationScreenKey,
    setArchivedMessagesNavigationScreenKey,
  ] = useState(0);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: colors.PRIMARY,
          fontWeight: fonts.HEADING_WEIGHT_SEMIBOLD,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}
      backBehavior="none"
    >
      <Tab.Screen
        navigationKey={`active-messages-navigation-screen-${activeMessagesNavigationScreenKey.toString()}`}
        name={stackNavigatorNames.MESSAGES}
        component={MessagesScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.ACTIVE_ALL,
        }}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[0].state || state.data.state.routes[0].state.index === 0) {
              shouldRefreshActiveMessagesTab.current = true;
            } else {
              shouldRefreshActiveMessagesTab.current = false;
              shouldRefreshArchivedMessagesTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshActiveMessagesTab.current) {
              setActiveMessagesNavigationScreenKey(activeMessagesNavigationScreenKey + 1);
            }
            shouldRefreshArchivedMessagesTab.current = false;
          },
        })}
      />
      <Tab.Screen
        navigationKey={`archived-messages-navigation-screen-${archivedMessagesNavigationScreenKey.toString()}`}
        name={stackNavigatorNames.ARCHIVED_MESSAGES}
        component={ArchivedMessagesScreen}
        options={{
          ...defaultHeaderOptions,
          title: locales.ARCHIVED_ALL,
        }}
        listeners={() => ({
          state: (state) => {
            if (!state.data.state.routes[1].state || state.data.state.routes[1].state.index === 0) {
              shouldRefreshArchivedMessagesTab.current = true;
            } else {
              shouldRefreshActiveMessagesTab.current = false;
              shouldRefreshArchivedMessagesTab.current = false;
            }
          },
          tabPress: () => {
            if (shouldRefreshArchivedMessagesTab.current) {
              setArchivedMessagesNavigationScreenKey(archivedMessagesNavigationScreenKey + 1);
            }
            shouldRefreshActiveMessagesTab.current = false;
          },
        })}
      />
    </Tab.Navigator>
  );
};
