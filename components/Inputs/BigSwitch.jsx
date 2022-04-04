import React from 'react';
import {
  TouchableOpacity, Text, View, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const BigSwitch = ({
  values, value, setValue, labels,
}) => {
  const onToggleHandler = () => {
    if (values[0] === value) setValue(values[1]);
    else setValue(values[0]);
  };

  return (
    <View style={{
      flexDirection: 'row',
      borderWidth: 2,
      borderRadius: 50,
      borderColor: colors.PRIMARY,
    }}
    >
      <TouchableOpacity
        style={[styles.container, value === values[0] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <Text style={[styles.text, value === values[0] ? styles.textChecked : '']}>{labels[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.container, value === values[1] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <Text style={[styles.text, value === values[1] ? styles.textChecked : '']}>{labels[1]}</Text>
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
