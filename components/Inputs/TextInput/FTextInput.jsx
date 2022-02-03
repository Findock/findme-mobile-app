import React from 'react';
import { Text, TextInput, View } from 'react-native';
import colors from '../../../constants/colors';
import sizeConstants from '../../../constants/sizeConstants';

export default FTextInput = ({ label, size, placeholder = '' }) => {
  const getInputSize = () => {
    switch (size) {
    case sizeConstants.LARGE:
      return {
        width: 320,
        paddingHorizontal: 30,
        paddingVertical: 10,
      };
    case sizeConstants.MEDIUM:
      return {
        width: 240,
        paddingHorizontal: 26,
        paddingVertical: 9,
      };
    case sizeConstants.SMALL:
    default:
      return {
        width: 160,
        paddingHorizontal: 22,
        paddingVertical: 8,
      };
    }
  };

  const renderLabel = () => {
    if (!label) return;
    return (
      <Text style={{
        fontSize: 16,
        paddingBottom: 10,
      }}
      >
        {label}
      </Text>
    );
  };

  return (
    <View>
      {renderLabel()}
      <TextInput
        placeholder={placeholder}
        style={{
          ...getInputSize(),
          backgroundColor: colors.LIGHT_GRAY,
          color: colors.GRAY,
        }}
      />
    </View>
  );
};
