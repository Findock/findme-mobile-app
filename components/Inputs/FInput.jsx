import React, { useState } from 'react';
import {
  StyleSheet, TextInput, TouchableWithoutFeedback, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from 'themes/colors';
import icons from 'themes/icons';
import inputTypes from 'constants/components/inputs/inputTypes';
import placements from 'themes/placements';
import sizes from 'themes/sizes';
import PropTypes from 'prop-types';
import { FErrorMessage } from 'components/Composition/FErrorMessage';

export const FInput = ({
  value,
  onChangeText,
  type,
  icon,
  iconPlacement,
  placeholder = '',
  maxLength = 256,
  errorMessage,
  rounded = false,
  marginBottom = sizes.MARGIN_25,
  width,
  outline = false,
  onPress = () => {
  },
  showSoftInputOnFocus = true,
  caretHidden = false,
  textAreaHeight = sizes.HEIGHT_80,
  onBlur = () => {
  },
  transparent,
  textAreaPaddingHorizontal,
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
  const getValue = () => {
    if (type === inputTypes.PHONE) {
      if (value.slice(0, 3)
        .toString() !== '+48' && value.length < 3) {
        return '+48';
      }
    }
    return value;
  };
  const getBackgroundColors = () => {
    if (rounded) return colors.WHITE;
    if (outline) return colors.TRANSPARENT;
    if (transparent) return colors.TRANSPARENT;
    return colors.LIGHT_GRAY;
  };
  const getBorderWidth = () => {
    if (rounded || outline) return sizes.BORDER_2;
    return 0;
  };
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

  const drawErrorMessage = () => errorMessage && (
    <FErrorMessage
      error={errorMessage}
      style={{ marginTop: sizes.MARGIN_3 }}
    />
  );

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
      marginBottom,
      width,
      height: type === inputTypes.TEXTAREA ? textAreaHeight : sizes.HEIGHT_54,
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
        showSoftInputOnFocus={showSoftInputOnFocus}
        placeholder={placeholder}
        value={getValue()}
        onChangeText={onChangeText}
        maxLength={type === inputTypes.PHONE ? 12 : maxLength}
        placeholderTextColor={colors.DARK_GRAY}
        autoCapitalize="none"
        secureTextEntry={!isPasswordVisible && type === inputTypes.PASSWORD}
        keyboardType={getKeyboardType()}
        multiline={type === inputTypes.TEXTAREA}
        onFocus={onPress}
        textAlign={placements.LEFT}
        onBlur={onBlur}
        caretHidden={caretHidden}
        style={{
          ...styles.input,
          paddingLeft: type === inputTypes.TEXTAREA && (textAreaPaddingHorizontal || textAreaPaddingHorizontal === 0)
            ? textAreaPaddingHorizontal : calcPaddingLeft(),
          paddingRight: type === inputTypes.TEXTAREA ? textAreaPaddingHorizontal : calcPaddingRight(),
          backgroundColor: getBackgroundColors(),
          borderWidth: getBorderWidth(),
          borderRadius: getBorderRadius(),
          paddingTop: type === inputTypes.TEXTAREA ? sizes.PADDING_10 : 0,
          paddingBottom: type === inputTypes.TEXTAREA ? sizes.PADDING_10 : 0,
          textAlignVertical: type === inputTypes.TEXTAREA ? 'top' : 'auto',
        }}
      />
      {drawPasswordVisibilityIcon()}
      {drawErrorMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: sizes.POSITION_14,
  },
  input: {
    color: colors.BLACK,
    borderColor: colors.GRAY,
    width: sizes.WIDTH_FULL,
    height: sizes.HEIGHT_FULL,
  },
});

FInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['phone', 'email', 'password', 'text', 'textarea']).isRequired,
  icon: PropTypes.string,
  iconPlacement: PropTypes.oneOf(['center', 'left', 'right']),
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  errorMessage: PropTypes.string,
  rounded: PropTypes.bool,
  marginBottom: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  outline: PropTypes.bool,
  onPress: PropTypes.func,
  showSoftInputOnFocus: PropTypes.bool,
  caretHidden: PropTypes.bool,
  textAreaHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  transparent: PropTypes.bool,
  textAreaPaddingHorizontal: PropTypes.number,
};
