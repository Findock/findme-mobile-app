import {
  StyleSheet, ActivityIndicator, Platform,
} from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import placements from 'themes/placements';
import React from 'react';

export const FSpinner = ({ style }) => {
  const getSize = () => (Platform.OS === 'ios' ? 'large' : sizes.ICON_30);
  return (
    <ActivityIndicator
      style={{
        ...styles.spinnerContainer,
        ...style,
      }}
      animating
      size={getSize()}
      color={colors.DARK_GRAY}
    />
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    width: sizes.WIDTH_FULL,
    height: sizes.HEIGHT_FULL,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
    zIndex: 3,
    backgroundColor: colors.OVERLAY,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
