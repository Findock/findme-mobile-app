import { Text, View } from 'react-native';
import placements from 'themes/placements';
import React from 'react';
import sizes from 'themes/sizes';

export const FHeading = ({
  title, size, color, weight, align = placements.LEFT, style, marginBottom = 0, isUnderline = false, numberOfLines, ellipsizeMode,
}) => (
  <View style={{
    width: sizes.WIDTH_FULL,
    marginBottom,
    ...style,
  }}
  >
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={{
        fontSize: size,
        color,
        fontWeight: weight,
        textAlign: align,
        textDecorationLine: isUnderline ? 'underline' : 'none',
        includeFontPadding: false,
      }}
    >
      {title}
    </Text>
  </View>
);
