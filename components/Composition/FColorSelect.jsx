import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import opacities from 'themes/opacities';

export const Circle = ({
  color, value, setValue, key,
}) => (
  <TouchableOpacity
    onPress={setValue}
  >
    <View
      key={key}
      backgroundColor={color}
      style={[value ? styles.pressed : styles.default, styles.circle]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  circle: {
    width: sizes.WIDTH_50,
    height: sizes.HEIGHT_50,
    borderRadius: sizes.RADIUS_50,
    margin: sizes.MARGIN_12,
  },
  default: {
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
    shadowColor: colors.PRIMARY,
    shadowOpacity: opacities.SHADOW_OPACITY_1,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowRadius: sizes.SHADOW_RADIUS_10,
    elevation: sizes.ELEVATION_5,
  },
});
