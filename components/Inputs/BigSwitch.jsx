import React, { useState } from 'react';
import {
  TouchableOpacity, Text, View, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const BigSwitch = ({
  value, setValue, labels,
}) => {
  const [
    isSelected,
    setIsSelected,
  ] = useState(true);

  return (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      borderWidth: 2,
      borderRadius: 50,
      borderColor: colors.PRIMARY,
    }}
    >
      <TouchableOpacity
        style={[styles.container, isSelected ? styles.backgroundChecked : '']}
        onPress={() => {
          setIsSelected(!isSelected);
          setValue(labels[0]);
          console.log(value);
        }}
      >
        <Text style={[styles.text, isSelected ? styles.textChecked : '']}>{labels[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.container, !isSelected ? styles.backgroundChecked : '']}
        onPress={() => {
          setIsSelected(!isSelected);
          setValue(labels[1]);
          console.log(value);
        }}
      >
        <Text style={[styles.text, !isSelected ? styles.textChecked : '']}>{labels[1]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      borderRadius: sizes.RADIUS_50,
      width: sizes.WIDTH_HALF,

    },
    text: {
      fontWeight: fonts.HEADING_WEIGHT_SEMIBOLD,
      textAlign: placements.CENTER,
      paddingVertical: sizes.PADDING_10,
      color: colors.BLACK,
    },
    backgroundChecked: {
      backgroundColor: colors.PRIMARY,
    },
    textChecked: {
      color: colors.WHITE,
    },
  },
);
