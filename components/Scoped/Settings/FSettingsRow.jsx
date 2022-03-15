import { FHeading } from 'components/Composition/FHeading';
import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/inputTypes';
import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';
import placements from 'themes/placements';
import sizes from 'themes/sizes';

export const FSettingsRow = ({
  label, value, isForm, withSwitch, style, onChangeText = () => { }, isPhoneInput, error, maxLength, isTextarea = false,
}) => {
  const getInputType = () => {
    if (isPhoneInput) return inputTypes.PHONE;
    if (isTextarea) return inputTypes.TEXTAREA;
    return inputTypes.TEXT;
  };
  const drawSettingRow = () => {
    if (withSwitch) {
      if (isForm) {
        return (
          <>
            <View>
              <FHeading
                color={colors.BLACK}
                size={fonts.HEADING_NORMAL}
                title={label}
                align={placements.LEFT}
                weight={fonts.HEADING_WEIGHT_BOLD}
              />
              <View style={styles.labelSpace}>
                <FHeading
                  color={colors.BLACK}
                  size={fonts.HEADING_NORMAL}
                  title={value}
                  align={placements.LEFT}
                  weight={fonts.HEADING_WEIGHT_REGULAR}
                />
              </View>
            </View>
            <View>
              <Text>SWITCH</Text>
            </View>
          </>
        );
      }
      return (
        <View>
          <FHeading
            color={colors.BLACK}
            size={fonts.HEADING_NORMAL}
            title={label}
            align={placements.LEFT}
            weight={fonts.HEADING_WEIGHT_BOLD}
          />
          <View style={styles.labelSpace}>
            <FHeading
              color={colors.BLACK}
              size={fonts.HEADING_NORMAL}
              title={value}
              align={placements.LEFT}
              weight={fonts.HEADING_WEIGHT_REGULAR}
            />
          </View>
        </View>
      );
    }

    if (isForm) {
      return (
        <View style={styles.fullWidth}>
          <FHeading
            color={colors.BLACK}
            size={fonts.HEADING_NORMAL}
            title={label}
            align={placements.LEFT}
            weight={fonts.HEADING_WEIGHT_BOLD}
          />
          <View style={styles.labelSpace}>
            <FInput
              onChangeText={onChangeText}
              value={value}
              width={sizes.WIDTH_FULL}
              type={getInputType()}
              errorMessage={error}
              rounded={false}
              marginBottom={0}
              outline
              maxLength={maxLength}
            />
          </View>
        </View>
      );
    }
    return (
      <View>
        <FHeading
          color={colors.BLACK}
          size={fonts.HEADING_NORMAL}
          title={label}
          align={placements.LEFT}
          weight={fonts.HEADING_WEIGHT_BOLD}
        />
        <View style={styles.labelSpace}>
          <FHeading
            color={colors.BLACK}
            size={fonts.HEADING_NORMAL}
            title={value}
            align={placements.LEFT}
            weight={fonts.HEADING_WEIGHT_REGULAR}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{
      ...styles.row,
      ...style,
    }}
    >
      {drawSettingRow()}
    </View>
  );
};

const styles = StyleSheet.create({
  labelSpace: {
    marginTop: sizes.MARGIN_10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: placements.CENTER,
    width: sizes.WIDTH_FULL,
  },
  fullWidth: {
    width: sizes.WIDTH_FULL,
  },
});
