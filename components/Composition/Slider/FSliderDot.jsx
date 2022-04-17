import React from 'react';
import { View, StyleSheet } from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import colors from 'themes/colors';
import opacities from 'themes/opacities';

export const FSliderDot = ({ isActive }) => {
  const getBackgroundColor = () => (isActive ? colors.PRIMARY : colors.WHITE);
  return (
    <View style={{ padding: sizes.PADDING_3 }}>
      <View style={{
        ...styles.dot,
        backgroundColor: getBackgroundColor(),
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: sizes.WIDTH_12,
    height: sizes.HEIGHT_12,
    borderRadius: getHalfBorderRadius(sizes.WIDTH_15),
    elevation: sizes.ELEVATION_2,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowOpacity: opacities.SHADOW_OPACITY_018,
    shadowRadius: sizes.SHADOW_RADIUS_1,
    shadowColor: colors.BLACK,
  },
});

FSliderDot.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
