import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import icons from 'themes/icons';
import inputTypes from 'constants/inputTypes';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import fonts from 'themes/fonts';

export const FInput = ({
  value, onChangeText, type, icon, iconPlacement, placeholder = '', maxLength = 256, errorMessage = '', rounded = false,
  marginBottom = sizes.MARGIN_25, width,
}) => {
  const [
    isPasswordVisible,
    setIsPasswordVisible,
  ] = useState(false);

  const calcPaddingLeft = () => ((icon && iconPlacement === placements.LEFT) ? sizes.PADDING_50 : sizes.PADDING_30);
  const calcPaddingRight = () => {
    if ((icon && iconPlacement === placements.RIGHT) || type === inputTypes.PASSWORD) return sizes.PADDING_50;
    return sizes.PADDING_30;
  };
  const getBackgroundColors = () => (rounded ? colors.WHITE : colors.GRAY);
  const getBorderWidth = () => (rounded ? sizes.BORDER_2 : 0);
  const getBorderRadius = () => (rounded ? sizes.RADIUS_20 : 0);

  const getKeyboardType = () => {
    switch (type) {
    case inputTypes.PHONE:
      return 'phone-pad';
    case inputTypes.EMAIL:
      return 'email-address';
    default:
      return 'default';
    }
  };

  const togglePasswordVisibility = () => {
    if (type === inputTypes.PASSWORD) {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const togglePasswordIconVisibilityName = () => {
    if (isPasswordVisible) return icons.EYE_OUTLINE;
    return icons.EYE_OFF_OUTLINE;
  };

  const drawErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

  const drawPasswordVisibilityIcon = () => type === inputTypes.PASSWORD && (
    <TouchableWithoutFeedback
      onPress={togglePasswordVisibility}
    >
      <Ionicons
        style={{
          ...styles.icon,
          top: 0,
          right: 0,
          padding: sizes.PADDING_14,
        }}
        name={togglePasswordIconVisibilityName()}
        size={sizes.ICON_22}
        color={colors.DARK_GRAY}
      />
    </TouchableWithoutFeedback>
  );

  return (

    <View style={{
      ...styles.inputContainer,
      marginBottom,
      width,
    }}
    >
      <Ionicons
        style={{
          ...styles.icon,
          left: iconPlacement === placements.LEFT ? sizes.POSITION_14 : null,
          right: iconPlacement === placements.RIGHT ? sizes.POSITION_14 : null,
        }}
        name={icon}
        size={sizes.ICON_22}
        color={colors.DARK_GRAY}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        placeholderTextColor={colors.DARK_GRAY}
        autoCapitalize="none"
        secureTextEntry={!isPasswordVisible && type === inputTypes.PASSWORD}
        keyboardType={getKeyboardType()}
        style={{
          ...styles.input,
          paddingLeft: calcPaddingLeft(),
          paddingRight: calcPaddingRight(),
          backgroundColor: getBackgroundColors(),
          borderWidth: getBorderWidth(),
          borderRadius: getBorderRadius(),
        }}
      />
      {drawPasswordVisibilityIcon()}
      {drawErrorMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    height: sizes.HEIGHT_54,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: sizes.POSITION_14,
  },
  input: {
    color: colors.BLACK,
    borderColor: colors.LIGHT_GRAY,
    width: sizes.WIDTH_FULL,
    height: sizes.HEIGHT_FULL,
  },
  errorMessage: {
    color: colors.RED,
    fontSize: fonts.HEADING_EXTRA_SMALL,
    marginTop: sizes.MARGIN_3,
  },
});
