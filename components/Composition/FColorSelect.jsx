import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import opacities from 'themes/opacities';

export const Circle = ({
  color, value, setValue, size,
}) => (
  <TouchableOpacity
    onPress={setValue}
  >
    <View
      backgroundColor={color}
      width={size}
      height={size}
      style={[styles.circle, value ? styles.pressed : styles.default]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  circle: {
    borderRadius: sizes.RADIUS_50,
    margin: sizes.MARGIN_12,
    shadowColor: colors.BLACK,
    shadowOpacity: opacities.SHADOW_OPACITY_018,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowRadius: sizes.SHADOW_RADIUS_1,
    elevation: sizes.ELEVATION_1,
  },
  pressed: {
    borderWidth: 3,
    borderColor: colors.PRIMARY,
  },
  default: {
    borderWidth: 0,
  },
});
