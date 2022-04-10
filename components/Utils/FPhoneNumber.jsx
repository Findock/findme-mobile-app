import { FHeading } from 'components/Composition/FHeading';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import PropTypes from 'prop-types';
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

FPhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['center', 'right', 'left']),
  isUnderline: PropTypes.bool.isRequired,
};
