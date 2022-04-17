import React from 'react';
import { View } from 'react-native';
import sizes from 'themes/sizes';

export const FContainer = ({ children }) => (
  <View style={{
    paddingHorizontal: sizes.PADDING_30,
    paddingVertical: sizes.PADDING_30,
  }}
  >
    {children}
  </View>
);
