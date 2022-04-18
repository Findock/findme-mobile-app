import React from 'react';
import { View, StyleSheet } from 'react-native';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import colors from 'themes/colors';
import { getHalfBorderRadius } from 'styles/utils/getHalfBorderRadius';
import defaultBoxShadow from 'styles/defaultBoxShadow';

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
    ...defaultBoxShadow,
  },
});

FSliderDot.propTypes = {
  isActive: PropTypes.bool.isRequired,
};
