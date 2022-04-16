import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import opacities from 'themes/opacities';
import { FHeading } from 'components/Composition/FHeading';
import PropTypes from 'prop-types';

export const FTileSelectInput = ({
  width, height, iconSize, iconDefault, iconPressed, label, setValue, value, style,
}) => (
  <TouchableOpacity
    onPress={setValue}
    style={{
      padding: sizes.PADDING_10,
      ...style,
    }}
  >
    <FImage
      imagePath={value ? iconPressed : iconDefault}
      width={width}
      height={height}
      resizeMode={sizes.CONTAIN}
      imageWidth={iconSize}
      imageHeight={iconSize}
      containerStyle={{
        ...styles.backgroundContainer,
        backgroundColor: value ? colors.PRIMARY : colors.LIGHT_GRAY,
        width,
        height,
      }}
    />
    <View style={{
      marginTop: 10,
      width,
    }}
    >
      <FHeading
        align={placements.CENTER}
        title={label}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
        color={colors.DARK_GRAY}
        size={fonts.HEADING_SMALL}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: placements.CENTER,
    alignItems: placements.CENTER,
    borderRadius: sizes.RADIUS_10,
    shadowColor: colors.BLACK,
    shadowOpacity: opacities.SHADOW_OPACITY_018,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_1,
    },
    shadowRadius: sizes.SHADOW_RADIUS_1,
    elevation: sizes.ELEVATION_1,
  },
});

FTileSelectInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconSize: PropTypes.number.isRequired,
  iconDefault: PropTypes.number.isRequired,
  iconPressed: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};
