import {
  StyleSheet, ActivityIndicator, Platform,
} from 'react-native';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import placements from 'themes/placements';

export const FSpinner = () => {
  const getSize = () => (Platform.OS === 'ios' ? 'large' : sizes.ICON_30);
  return (
    <ActivityIndicator
      style={styles.spinnerContainer}
      animating
      size={getSize()}
      color={colors.DARK_GRAY}
    />
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: sizes.WIDTH_FULL,
    height: sizes.HEIGHT_FULL,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
    zIndex: 3,
    backgroundColor: colors.OVERLAY,
  },
});
