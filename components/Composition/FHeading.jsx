import { Text, View } from 'react-native';
import placements from 'themes/placements';
import React from 'react';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FHeading = ({
  title, size, color, weight, align = placements.LEFT, style, marginBottom = 0, isUnderline = false,
}) => (
  <View style={{
    width: sizes.WIDTH_FULL,
    marginBottom,
    ...style,
  }}
  >
    <Text style={{
      fontSize: size,
      color,
      fontWeight: weight,
      textAlign: align,
      textDecorationLine: isUnderline ? 'underline' : 'none',
      includeFontPadding: false,
    }}
    >
      {title}
    </Text>
  </View>
);

FHeading.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  marginBottom: PropTypes.number,
  isUnderline: PropTypes.bool,
};
