import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import opacities from 'themes/opacities';
import sizes from 'themes/sizes';

export const FCard = ({
  children, width, paddingVertical, paddingHorizontal, style, backgroundColor = colors.WHITE,
}) => (
  <View style={{
    width,
    ...styles.card,
    ...style,
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
  }}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: sizes.RADIUS_20,
    elevation: sizes.ELEVATION_3,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_020,
    shadowRadius: sizes.SHADOW_RADIUS_2,
    shadowColor: colors.BLACK,
  },
});
