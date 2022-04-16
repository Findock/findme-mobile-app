import {
  StyleSheet, TouchableWithoutFeedback, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import sizes from 'themes/sizes';
import placements from 'themes/placements';
import React from 'react';
import { FHeading } from 'components/Composition/FHeading';
import checkboxTypes from 'constants/components/checkboxTypes';
import PropTypes from 'prop-types';

export const FCheckbox = ({
  type, label, labelColor, labelSize, labelWeight,
  checkboxBorderColor, checkboxBgColor, iconColor, value, setValue, style,
}) => {
  const getBackgroundColor = () => (value ? checkboxBgColor : 'transparent');

  return (
    <TouchableWithoutFeedback
      onPress={() => setValue(!value)}
      hitSlop={{
        top: sizes.POSITION_20,
        left: sizes.POSITION_20,
        bottom: sizes.POSITION_20,
        right: sizes.POSITION_20,
      }}
    >
      <View style={{
        ...style,
        ...styles.checkboxContainer,
      }}
      >
        <View style={{
          ...styles.checkbox,
          borderColor: checkboxBorderColor,
          backgroundColor: getBackgroundColor(),
        }}
        >
          {type === checkboxTypes.CHECKBOX_WITH_ICON && value && (
            <Ionicons
              name={icons.CHECKMARK_OUTLINE}
              size={sizes.ICON_22}
              style={styles.icon}
              color={iconColor}
            />
          )}

        </View>
        <View>
          {label && (
            <FHeading
              color={labelColor}
              title={label}
              weight={labelWeight}
              size={labelSize}
              style={{ marginLeft: sizes.MARGIN_8 }}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: placements.CENTER,
  },
  checkbox: {
    borderWidth: sizes.BORDER_1,
    borderRadius: sizes.RADIUS_5,
    width: sizes.WIDTH_22,
    height: sizes.HEIGHT_22,
    alignItems: placements.CENTER,
    justifyContent: placements.CENTER,
  },
  icon: {
    top: sizes.POSITION_N1,
  },
});

FCheckbox.propTypes = {
  type: PropTypes.oneOf(['icon', 'color']).isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  labelSize: PropTypes.number,
  labelWeight: PropTypes.string,
  checkboxBorderColor: PropTypes.string.isRequired,
  checkboxBgColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};
