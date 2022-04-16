import React from 'react';
import {
  TouchableOpacity, View, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import sizes from 'themes/sizes';
import { FHeading } from 'components/Composition/FHeading';
import placements from 'themes/placements';
import PropTypes from 'prop-types';

export const FBigSwitch = ({
  values, value, setValue, labels, style,
}) => {
  const onToggleHandler = () => {
    if (values[0] === value) setValue(values[1]);
    else setValue(values[0]);
  };
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.halfContainer, value === values[0] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <View>
          <FHeading
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            align={placements.CENTER}
            size={fonts.HEADING_MEDIUM}
            title={labels[0]}
            color={value === values[0] ? colors.WHITE : colors.BLACK}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.halfContainer, value === values[1] ? styles.backgroundChecked : '']}
        onPress={onToggleHandler}
      >
        <View>
          <FHeading
            weight={fonts.HEADING_WEIGHT_SEMIBOLD}
            align={placements.CENTER}
            size={fonts.HEADING_MEDIUM}
            title={labels[1]}
            color={value === values[1] ? colors.WHITE : colors.BLACK}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: sizes.BORDER_2,
    borderRadius: sizes.RADIUS_50,
    borderColor: colors.PRIMARY,
    width: sizes.WIDTH_FULL,
    overflow: 'hidden',
  },
  halfContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: sizes.RADIUS_20,
    flexBasis: sizes.BASIS_47_PERCENTAGES,
    paddingVertical: sizes.PADDING_10,
  },
  backgroundChecked: {
    backgroundColor: colors.PRIMARY,
    flexBasis: sizes.BASIS_53_PERCENTAGES,
  },
});

FBigSwitch.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
