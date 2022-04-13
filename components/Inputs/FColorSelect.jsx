import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import opacities from 'themes/opacities';
import { getHalfBorderRadius } from 'utils/getHalfBorderRadius';
import PropTypes from 'prop-types';

export const FColorSelect = ({
  color, value, setValue, size, style,
}) => {
  const getBorderStyle = (hex, isSelected) => {
    if (hex === '#FFFFFF' && isSelected) {
      return styles.pressed;
    }
    if (hex === '#FFFFFF') {
      return styles.lightBorder;
    }
    if (isSelected) {
      return styles.pressed;
    }
    return styles.default;
  };
  return (
    <TouchableOpacity
      onPress={setValue}
    >
      <View
        borderRadius={getHalfBorderRadius(size)}
        backgroundColor={color}
        width={size}
        height={size}
        style={[styles.circle, getBorderStyle(color, value), style]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
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
    borderWidth: sizes.BORDER_3,
    borderColor: colors.PRIMARY,
  },
  default: {
    borderWidth: 0,
  },
  lightBorder: {
    borderWidth: sizes.BORDER_2,
    borderColor: colors.LIGHT_GRAY,
  },
});

FColorSelect.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};
