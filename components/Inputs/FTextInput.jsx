import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FKeyboardAvoidingView } from './../Utils/FKeyboardAvoidingView ';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import colors from '../../themes/colors';
import placements from '../../themes/placements';
import sizes from '../../storybook/sizes';

export const FTextInput = ({
  value, onChangeText, icon, iconPlacement,  placeholder = '', maxLength = 256, errorMessage = '', rounded = false,
}) => {

  const calcPaddingLeft = () => ((icon && iconPlacement === placements.LEFT) ? sizes.PADDING_50 : sizes.PADDING_30);
  const calcPaddingRight = () => ((icon && iconPlacement === placements.RIGHT) ? sizes.PADDING_50 : sizes.PADDING_30);
  const getBackgroundColors = () => rounded ? colors.WHITE : colors.GRAY;
  const getBorderWidth = () => rounded ? sizes.BORDER_2 : 0;
  const getBorderRadius = () => rounded ? 20 : 0;


  const drawErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

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
            style={{
              ...styles.input,
              paddingLeft: calcPaddingLeft(),
              paddingRight: calcPaddingRight(),
              backgroundColor: getBackgroundColors(),
              borderWidth: getBorderWidth(),
              borderRadius: getBorderRadius(),
            }}
          />
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
