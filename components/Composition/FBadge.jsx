import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';

export const FBadge = ({
  title,
  color,
  isFill,
  style,
}) => {
  const getStylesDependingOnIsFill = () => {
    if (isFill) {
      return {
        backgroundColor: color,
      };
    }
    return {
      borderColor: color,
      borderWidth: sizes.BORDER_2,
    };
  };

  return (
    <View style={[getStylesDependingOnIsFill(), styles.badge, style]}>
      <FHeading
        title={title}
        color={isFill ? colors.WHITE : color}
        size={fonts.HEADING_MEDIUM}
        weight={fonts.HEADING_WEIGHT_MEDIUM}
        align={placements.CENTER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: sizes.PADDING_3,
    paddingHorizontal: 15,
    borderRadius: sizes.RADIUS_20,
  },

});

FBadge.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isFill: PropTypes.bool.isRequired,
};
