import { ActivityIndicator, Platform } from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import React from 'react';

export const FActivityIndicator = () => (
  <ActivityIndicator
    animating
    size={Platform.OS === 'ios' ? 'large' : sizes.ICON_30}
    color={colors.GRAY}
  />
);
