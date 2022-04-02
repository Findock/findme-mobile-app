import { FCheckbox } from 'components/Inputs/FCheckbox';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FMultiSelectOption = ({ label, setValue, value }) => (
  <View style={styles.option}>
    <FCheckbox
      checkboxBorderColor={value ? colors.PRIMARY : colors.DARK_GRAY}
      checkboxBgColor={colors.PRIMARY}
      style={styles.checkbox}
      setValue={setValue}
      value={value}
      label={label}
      labelColor={colors.DARK_GRAY}
      labelWeight={fonts.HEADING_WEIGHT_MEDIUM}
      labelSize={fonts.HEADING_NORMAL}
    />
  </View>
);

const styles = StyleSheet.create({
  option: {
    width: sizes.WIDTH_FULL,
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  checkbox: {
    marginRight: sizes.MARGIN_8,
    width: sizes.WIDTH_FULL,
  },
});
