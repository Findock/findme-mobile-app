import { FLoginHistoryList } from 'components/Scoped/LoginHistory/FLoginHistoryList';
import React from 'react';
import { View } from 'react-native';
import colors from 'themes/colors';
import sizes from 'themes/sizes';

export const LoginHistoryScreen = () => (
  <View style={{
    backgroundColor: colors.WHITE,
    flex: 1,
    marginTop: sizes.MARGIN_1,
  }}
  >
    <FLoginHistoryList />
  </View>
);
