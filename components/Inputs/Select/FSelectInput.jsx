import { FInput } from 'components/Inputs/FInput';
import inputTypes from 'constants/components/inputs/inputTypes';
import React from 'react';
import { View, Keyboard } from 'react-native';
import icons from 'themes/icons';
import placements from 'themes/placements';
import { useNavigation } from '@react-navigation/native';
import stackNavigatorNames from 'constants/stackNavigatorNames';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const FSelectInput = ({
  width, options, defaultOption,
}) => {
  const navigation = useNavigation();
  const selectedOption = useSelector((state) => state.select.selectedOption);
  return (
    <View>
      <FInput
        type={inputTypes.TEXT}
        width={width}
        marginBottom={0}
        showSoftInputOnFocus={false}
        onChangeText={() => { }}
        iconPlacement={placements.RIGHT}
        icon={icons.CHEVRON_DOWN_OUTLINE}
        rounded
        value={selectedOption.label ? selectedOption.label : defaultOption.label}
        caretHidden
        onPress={() => {
          Keyboard.dismiss();
          navigation.push(stackNavigatorNames.SELECT, {
            options,
            defaultOption,
          });
        }}
      />
    </View>
  );
};

FSelectInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selectedOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  defaultOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};
