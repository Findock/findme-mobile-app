import React from 'react';
import {
  TouchableOpacity, View, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';

export const FBigSwitch = ({
  values, value, setValue, labels,
}) => {
  const onToggleHandler = () => {
    if (values[0] === value) setValue(values[1]);
    else setValue(values[0]);
  };

  return (
    <View style={{
      flexDirection: 'row',
      borderWidth: sizes.BORDER_2,
      borderRadius: sizes.RADIUS_50,
      borderColor: colors.PRIMARY,
    }}
    >
      <TouchableOpacity
        style={[styles.container, value === values[0] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <FHeading
          align={placements.CENTER}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          size={fonts.HEADING_MEDIUM}
          title={labels[0]}
          color={value === values[0] ? colors.WHITE : colors.BLACK}
          paddingVertical={sizes.PADDING_10}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.container, value === values[1] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <FHeading
          align={placements.CENTER}
          weight={fonts.HEADING_WEIGHT_SEMIBOLD}
          size={fonts.HEADING_MEDIUM}
          title={labels[0]}
          color={value === values[1] ? colors.WHITE : colors.BLACK}
          paddingVertical={sizes.PADDING_10}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: colors.WHITE,
      borderRadius: sizes.RADIUS_50,
      width: sizes.WIDTH_HALF,
    },
    backgroundChecked: {
      backgroundColor: colors.PRIMARY,
    },
  },
);
