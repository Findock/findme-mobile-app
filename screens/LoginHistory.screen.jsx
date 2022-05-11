import { FLoginHistoryList } from 'components/Scoped/LoginHistory/FLoginHistoryList';
import React from 'react';
import { View, Dimensions } from 'react-native';
import colors from 'themes/colors';

export const LoginHistoryScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    flex: 1,
  }}
  >
    <FLoginHistoryList />
  </View>
);
