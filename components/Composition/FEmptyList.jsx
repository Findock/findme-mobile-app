import { StyleSheet, View } from 'react-native';
import { FHeading } from 'components/Composition/FHeading';
import fonts from 'themes/fonts';
import colors from 'themes/colors';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import placements from 'themes/placements';

export const FEmptyList = ({
  title,
  withIcon,
  style,
}) => (
  <View style={{
    ...styles.container,
    ...style,
  }}
  >
    <View>
      <FHeading
        size={fonts.HEADING_NORMAL}
        color={colors.DARK_GRAY}
        weight={fonts.HEADING_WEIGHT_REGULAR}
        align={placements.CENTER}
        title={title}
      />
    </View>
    {withIcon && (
      <Ionicons
        name={icons.PAW}
        size={sizes.ICON_20}
        color={colors.SECONDARY}
        style={{ marginLeft: 10 }}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    alignItems: placements.CENTER,
  },
});

FEmptyList.propTypes = {
  title: PropTypes.string.isRequired,
  withIcon: PropTypes.bool.isRequired,
};
