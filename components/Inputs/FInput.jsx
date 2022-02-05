import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FKeyboardAvoidingView } from '../Utils/FKeyboardAvoidingView ';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import colors from '../../themes/colors';
import icons from '../../themes/icons';
import inputTypes from '../../constants/inputTypes';
import placements from '../../themes/placements';
import sizes from '../../themes/sizes'
import { useState } from 'react';

export const FInput = ({
  value, onChangeText, type, icon, iconPlacement, placeholder = '', maxLength = 256, errorMessage = '', rounded = false,
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const calcPaddingLeft = () => ((icon && iconPlacement === placements.LEFT) ? sizes.PADDING_50 : sizes.PADDING_30);
  const calcPaddingRight = () => ((icon && iconPlacement === placements.RIGHT) ? sizes.PADDING_50 : sizes.PADDING_30);
  const getBackgroundColors = () => rounded ? colors.WHITE : colors.GRAY;
  const getBorderWidth = () => rounded ? sizes.BORDER_2 : 0;
  const getBorderRadius = () => rounded ? sizes.RADIUS_20 : 0;
  // const setSecureTextEntry = () => type === inputTypes.PASSWORD;

  const getKeyboardType = () => {
    switch (type) {
      case inputTypes.PHONE:
        return 'phone-pad';
      case inputTypes.EMAIL:
        return 'email-address'
      default:
        return 'default';
    }
  }

  const togglePasswordVisibility = () => {
    if (type === inputTypes.PASSWORD) {
      setIsPasswordVisible(!isPasswordVisible)
    }
  }

  const togglePasswordIconVisibilityName = () => {
    if (isPasswordVisible) return icons.EYE_OUTLINE
    else return icons.EYE_OFF_OUTLINE
  }

  const drawErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

  const drawPasswordVisibilityIcon = () => {
    return type === inputTypes.PASSWORD && (
      <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
        <Ionicons
          style={{
            ...styles.icon,
            right: sizes.POSITION_30
          }}
          name={togglePasswordIconVisibilityName()}
          size={sizes.ICON_22}
          color={colors.DARK_GRAY}
        />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <FKeyboardAvoidingView>
      <View style={styles.inputContainer}>
       
          <Ionicons
            style={{
              ...styles.icon,
              left: iconPlacement === placements.LEFT ? sizes.POSITION_14 : null,
              right: iconPlacement === placements.RIGHT ? sizes.POSITION_30 : null,
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
          autoCapitalize='none'
          secureTextEntry={!isPasswordVisible}
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
    </FKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    flex: 1
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: sizes.POSITION_14
  },
  input: { 
    color: colors.BLACK,
    width: sizes.WIDTH_310,
    height: sizes.HEIGHT_54,
    borderColor: colors.LIGHT_GRAY,
  },
  errorMessage: {
    color: colors.RED,
  },
});
