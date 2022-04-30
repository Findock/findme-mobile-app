import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const FSelectOption = ({ label, selectOption }) => {
  const selectedOption = useSelector((state) => state.select.selectedOption);

  const isChosen = () => label === selectedOption.label;

  return (
    <TouchableOpacity onPress={selectOption}>
      <View style={{
        ...styles.option,
        backgroundColor: isChosen() ? colors.LIGHT_GRAY : colors.WHITE,
      }}
      >
        <FHeading
          title={label}
          size={fonts.HEADING_NORMAL}
          weight={fonts.HEADING_WEIGHT_MEDIUM}
          color={colors.DARK_GRAY}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    width: sizes.WIDTH_FULL,
    paddingVertical: sizes.PADDING_20,
    paddingHorizontal: sizes.PADDING_10,
  },
});

FSelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  selectOption: PropTypes.func.isRequired,
};
