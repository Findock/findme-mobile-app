import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import locales from 'constants/locales';
import icons from 'themes/icons';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import React from 'react';
import PropTypes from 'prop-types';

export const FLogo = ({
  color, fill, iconSize, titleSize,
}) => {
  const getIconName = () => (fill ? icons.PAW : icons.PAW_OUTLINE);

  return (
    <View style={styles.logoContainer}>
      <Ionicons
        size={iconSize || sizes.ICON_25}
        name={getIconName()}
        color={color}
        style={styles.icon}
      />
      <View>
        <FHeading
          title={locales.FIND_ME}
          color={color}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          size={titleSize || fonts.HEADING_LARGE}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  icon: {
    marginRight: sizes.MARGIN_5,
  },
});

FLogo.propTypes = {
  color: PropTypes.string.isRequired,
  fill: PropTypes.bool.isRequired,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleSize: PropTypes.number,
};
