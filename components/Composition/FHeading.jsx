import { Text, View } from 'react-native';
import placements from 'themes/placements';
import React from 'react';
import sizes from 'themes/sizes';

export const FHeading = ({
  title, size, color, weight, align = placements.LEFT, style,
}) => (
  <View style={{
    width: sizes.WIDTH_FULL,
    ...style,
  }}
  >
    <Text style={{
      fontSize: size,
      color,
      fontWeight: weight,
      textAlign: align,
    }}
    >
      {title}
    </Text>
  </View>
);
