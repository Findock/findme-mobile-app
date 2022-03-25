import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { parsePhoneNumber } from '../../utils/parsePhoneNumber';

export const FPhoneNumber = ({
  phoneNumber, weight, size, color, align, style, isUnderline,
}) => (
  <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
    <View style={{ ...style }}>
      <FHeading
        color={color}
        size={size}
        title={phoneNumber && parsePhoneNumber(phoneNumber)}
        weight={weight}
        align={align}
        isUnderline={isUnderline}
      />
    </View>
  </TouchableOpacity>
);
