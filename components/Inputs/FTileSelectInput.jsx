import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import opacities from 'themes/opacities';
import { FHeading } from 'components/Composition/FHeading';

export const FTileSelectInput = ({
  width, height, iconSize, iconDefault, iconPressed, label, setValue, value, style,
}) => (
  <TouchableOpacity onPress={() => setValue(!value)}>
    <View style={[
      styles.backgroundContainer,
      {
        backgroundColor: value ? colors.PRIMARY : colors.LIGHT_GRAY,
        shadowOpacity: value ? 0 : opacities.SHADOW_OPACITY_1,
        elevation: value ? 0 : sizes.ELEVATION_5,
        width,
        height,
        ...style,
      },
    ]}
    >
      <FImage
        imagePath={value ? iconPressed : iconDefault}
        width={iconSize}
        height={iconSize}
      />
    </View>
    <View>
      <FHeading
        align={placements.CENTER}
        title={label}
        weight={fonts.HEADING_WEIGHT_SEMIBOLD}
        color={colors.DARK_GRAY}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: placements.CENTER,
    margin: sizes.MARGIN_10,
    alignItems: placements.CENTER,
    borderRadius: sizes.RADIUS_10,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: sizes.HEIGHT_2,
    },
    shadowRadius: sizes.RADIUS_5,
  },
});
