import React from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../themes/colors';
import sizes from '../../themes/sizes';

export const FTextInput = ({
  value, onChangeText, icon, placeholder = '', maxLength = 256, errorMessage = '',
}) => {
  const calcPaddingLeft = () => (icon ? sizes.PADDING_50 : sizes.PADDING_30);

  const drawErrorMessage = () => {
    if (!errorMessage) return;
    return <Text style={styles.errorMessage}>{errorMessage}</Text>;
  };

  return (
    <View style={styles.inputContainer}>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={sizes.ICON_22}
        color={colors.GRAY}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={{
          ...styles.input,
          paddingLeft: calcPaddingLeft(),
        }}
      />
      {drawErrorMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: sizes.POSITION_14,
    top: sizes.POSITION_14,
    zIndex: 1,
  },
  input: {
    backgroundColor: colors.LIGHT_GRAY,
    color: colors.BLACK,
    width: sizes.WIDTH_310,
    height: sizes.HEIGHT_54,
    paddingHorizontal: sizes.PADDING_30,
  },
  errorMessage: {
    color: colors.RED,
  },
});
