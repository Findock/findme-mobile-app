import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FImage } from 'components/Composition/FImage';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import colors from 'themes/colors';
import fonts from 'themes/fonts';

export const TileSelectInput = ({
  iconSize, iconDefault, iconPressed, label, setValue, value,
}) => {
  const [
    isPressed,
    setIsPressed,
  ] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
      <FImage
        imagePath={isPressed ? iconPressed : iconDefault}
        width={iconSize}
        height={iconSize}
        containerStyle={{
          padding: sizes.PADDING_5,
          margin: sizes.MARGIN_5,
          backgroundColor: isPressed ? colors.PRIMARY : colors.LIGHT_GRAY,
          borderRadius: sizes.RADIUS_10,
          shadowColor: colors.DARK_GRAY,
          shadowOffset: {
            width: sizes.WIDTH_0,
            height: sizes.HEIGHT_2,
          },
          shadowOpacity: isPressed ? 0 : 1,
          shadowRadius: sizes.RADIUS_5,
          elevation: sizes.ELEVATION_5,
        }}
      />
      <Text style={{
        textAlign: placements.CENTER,
        fontWeight: fonts.HEADING_WEIGHT_SEMIBOLD,
        color: colors.DARK_GRAY,
      }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
