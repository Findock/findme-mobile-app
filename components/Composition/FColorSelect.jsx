import {
  StyleSheet, View, ScrollView, TouchableOpacity,
} from 'react-native';
import React from 'react';
import sizes from 'themes/sizes';
import colors from 'themes/colors';

export const FColorSelect = ({
  data, style, value, setValue,
}) => (
  <ScrollView
    horizontal
    style={{
      ...styles.container,
      ...style,
    }}
  >
    {data.map((color) => (
      <TouchableOpacity
        key={color.id}
        onPress={() => {
          setValue(!value);
        }}
      >
        <View
          style={{
            ...styles.circle,
            backgroundColor: color.hex,
            borderColor: color.hex === '#FFFFFF' ? colors.LIGHT_GRAY : colors.TRANSPARENT,
            borderWidth: color.hex === '#FFFFFF' ? sizes.BORDER_2 : 0,
          }}
        />
      </TouchableOpacity>
    ))}
  </ScrollView>
);
const styles = StyleSheet.create({
  container: {
    width: sizes.WIDTH_FULL,
    margin: sizes.MARGIN_10,
  },
  circle: {
    width: sizes.WIDTH_50,
    height: sizes.HEIGHT_50,
    borderRadius: sizes.RADIUS_50,
    margin: sizes.MARGIN_12,
  },
});
