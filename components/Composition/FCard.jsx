import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import opacities from 'themes/opacities';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FCard = ({
  children, width, paddingVertical, paddingHorizontal, style, backgroundColor = colors.WHITE, rounded = true,
}) => (
  <View style={{
    width,
    ...styles.card,
    ...style,
    paddingHorizontal,
    paddingVertical,
    backgroundColor,
    borderRadius: rounded ? sizes.RADIUS_20 : 0,
  }}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
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

FCard.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  backgroundColor: PropTypes.string,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  rounded: PropTypes.bool,
};
