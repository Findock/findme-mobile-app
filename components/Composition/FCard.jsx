import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import opacities from 'themes/opacities';
import sizes from 'themes/sizes';

export const FCard = ({
  children, width, paddingVertical, paddingHorizontal,
}) => (
  <View style={{
    width,
    ...styles.card,
    paddingHorizontal,
    paddingVertical,
  }}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.WHITE,
    borderRadius: sizes.RADIUS_20,
    elevation: sizes.ELEVATION_1,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_018,
    shadowRadius: sizes.SHADOW_RADIUS_1,
    shadowColor: colors.BLACK,
  },
});
