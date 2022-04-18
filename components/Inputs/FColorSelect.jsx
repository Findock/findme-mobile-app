import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';
import defaultBoxShadow from 'styles/defaultBoxShadow';

export const FColorSelect = ({
  color, value, setValue, size, style, readOnly,
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

  const drawColorSelect = () => (
    <View style={{
      padding: sizes.PADDING_12,
      ...style,
    }}
    >
      <View
        borderRadius={getHalfBorderRadius(size)}
        backgroundColor={color}
        width={size}
        height={size}
        style={[styles.circle, getBorderStyle(color, value)]}
      />
    </View>
  );

  return (
    readOnly ? (
      drawColorSelect()
    )
      : (
        <TouchableOpacity
          onPress={setValue}
        >
          {drawColorSelect()}
        </TouchableOpacity>
      )
  );
};

const styles = StyleSheet.create({
  circle: {
    ...defaultBoxShadow,
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
  value: PropTypes.bool,
  setValue: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  readOnly: PropTypes.bool.isRequired,
};
