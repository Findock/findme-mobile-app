import { FLoginHistoryList } from 'components/Scoped/LoginHistory/FLoginHistoryList';
import React from 'react';
import { View, Dimensions } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const LoginHistoryScreen = () => (
  <View style={{
    height: Dimensions.get('screen').height,
    backgroundColor: colors.WHITE,
    paddingVertical: sizes.PADDING_30,
  }}
  >
    <FLoginHistoryList />
  </View>
);
